import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.modelName, schema: User.model.schema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
