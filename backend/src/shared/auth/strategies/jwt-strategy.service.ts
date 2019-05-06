import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Jwtpayload } from "../jwt-payload";
import { AuthService } from "../auth.service";
import { Configuration } from "src/shared/configuration/configuration.enum";
import { ConfigurationService } from "src/shared/configuration/configuration.service";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(private readonly _authService: AuthService,
                private readonly _configurationService: ConfigurationService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configurationService.get(Configuration.JWT_KEY),
        });
    }

    async validate(payload: Jwtpayload, done: VerifiedCallback) {
        const user = await this._authService.validatePayload(payload);

        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}
