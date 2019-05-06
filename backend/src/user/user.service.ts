import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { ModelType } from "typegoose";
import { genSalt, hash, compare } from "bcryptjs";

import { User } from "./models/user.model";
import { UserVm } from "./models/view-models/user-vm.model";
import { LoginVm } from "./models/view-models/login-vm.model";
import { Jwtpayload } from "src/shared/auth/jwt-payload";
import { RegisterVm } from "./models/view-models/register-vm.model";
import { BaseService } from "src/shared/base.service";
import { AuthService } from "src/shared/auth/auth.service";
import { MapperService } from "src/shared/mapper/mapper.service";
import { LoginResponseVM } from "./models/view-models/login-responce-vm.model";


@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
                @Inject(forwardRef(() => AuthService))
                readonly _authService: AuthService,
                private readonly _mapperService: MapperService) {
        super();

        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }

    async register(registerVm: RegisterVm): Promise<User> {
        const { username, password, firstName, lastName } = registerVm;

        const newUser = new this._model();
        newUser.username = username;
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return result.toJSON() as User;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(loginVm: LoginVm): Promise<LoginResponseVM> {
        const { username, password } = loginVm;

        const user = await this.findOne({ username });
        if (!user) {
            throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
        }

        const payload: Jwtpayload = {
            username: user.username,
            role: user.role,
        };

        const token = await this._authService.sighPayload(payload);
        const userVm: UserVm = await this.map<UserVm>(user.toJSON());

        return {
            token,
            user: userVm,
        };
    }
}
