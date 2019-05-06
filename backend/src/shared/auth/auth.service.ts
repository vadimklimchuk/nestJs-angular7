import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { SignOptions, sign } from "jsonwebtoken";

import { InstanceType } from "typegoose";

import { User } from "src/user/models/user.model";
import { Jwtpayload } from "./jwt-payload";
import { UserService } from "src/user/user.service";
import { Configuration } from "../configuration/configuration.enum";
import { ConfigurationService } from "../configuration/configuration.service";

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;


    constructor(@Inject(forwardRef(() => UserService))
                readonly _userService: UserService,
                private readonly _configurationService: ConfigurationService) {

        this.jwtOptions = { expiresIn: "12h" };
        this.jwtKey = _configurationService.get(Configuration.JWT_KEY);
    }

    async sighPayload(payload: Jwtpayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validatePayload(payload: Jwtpayload): Promise<InstanceType<User>> {
        return this._userService.findOne({ username: payload.username.toLowerCase() });
    }
}
