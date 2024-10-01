import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "src/controllers/getDetails.controller";
import { Pkg, PkgSchema } from "src/schemas/pkgs.schema";
import { user, userSchema } from "src/schemas/user.schema";
import {  Userservice } from "src/services/getDetails.service";
import { HelperService } from "src/services/helper";
import { AuthModule } from "./auth.module";
import { UserdetailsSchema } from "src/schemas/userdetails.schema";




@Module({
    imports: [
      MongooseModule.forFeature([
        { name: user.name, schema: userSchema },
        { name: 'Pkg', schema: PkgSchema },
        { name: 'userdetails', schema: UserdetailsSchema },
      ]),
      AuthModule,
    ],
    controllers: [UserController],
    providers: [Userservice, HelperService],
  })
  export class userDetails {}