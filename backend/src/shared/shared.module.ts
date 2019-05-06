import { Module, Global } from "@nestjs/common";

import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth/auth.service";
import { MapperService } from "./mapper/mapper.service";
import { JwtStrategyService } from "./auth/strategies/jwt-strategy.service";
import { ConfigurationService } from "./configuration/configuration.service";


@Global()
@Module({
  providers: [
    ConfigurationService,
    MapperService,
    AuthService,
    JwtStrategyService,
  ],
  exports: [
    ConfigurationService,
    MapperService,
    AuthService,
  ],
  imports: [UserModule],
})
export class SharedModule {}
