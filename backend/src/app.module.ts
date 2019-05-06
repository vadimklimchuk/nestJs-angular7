import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from "./user/user.module";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { AppController } from "./app.controller";
import { Configuration } from "./shared/configuration/configuration.enum";
import { ConfigurationService } from "./shared/configuration/configuration.service";




@Module({
  imports: [
    MongooseModule.forRoot(ConfigurationService.connectionString),
    SharedModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;

  public constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(this.configurationService.get(Configuration.PORT));
    AppModule.host = this.configurationService.get(Configuration.HOST);
    AppModule.isDev = this.configurationService.getIsDevelopment();
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === "string" ? parseInt(param, 10) : param;

    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
