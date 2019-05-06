import { ApiUseTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { Controller, Post, HttpStatus, Body, HttpException } from "@nestjs/common";

import { User } from "./models/user.model";
import { UserVm } from "./models/view-models/user-vm.model";
import { LoginVm } from "./models/view-models/login-vm.model";
import { RegisterVm } from "./models/view-models/register-vm.model";
import { UserService } from "./user.service";
import { ApiException } from "src/shared/api-exception.model";
import { GetOperationId } from "src/shared/utilities/get-operation-id";
import { LoginResponseVM } from "./models/view-models/login-responce-vm.model";

@Controller("users")
@ApiUseTags(User.modelName)
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post("register")
    @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, "Register"))
    async register(@Body() registerVm: RegisterVm): Promise<UserVm> {
        const { username, password } = registerVm;

        if (!username) {
            throw new HttpException("Username is required", HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException("Password is required", HttpStatus.BAD_GATEWAY);
        }

        let exist;
        try {
            console.log(username);
            exist = await this._userService.findOne({ username });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
        }

        const newUser = await this._userService.register(registerVm);
        console.log(newUser);
        return this._userService.map<UserVm>(newUser);
    }

    @Post("login")
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseVM })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, "Login"))
    async login(@Body() loginVm: LoginVm): Promise<LoginResponseVM> {
        const fields = Object.keys(loginVm);
        fields.forEach(field => {
            if (!loginVm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._userService.login(loginVm);
    }
}
