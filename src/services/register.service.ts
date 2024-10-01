// import {
//   Injectable,
//   Get,
//   Req,
//   Res,
//   HttpException,
//   HttpStatus,
//   Post,
//   UsePipes,
//   Body,
//   BadRequestException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { register } from 'src/schemas/register.schema';
// import { Model } from 'mongoose';
// import { registerSchema } from 'src/validation';
// import JoiValidationPipe from 'src/validation/joi-validation.pipe';
// import { IRegistration } from 'src/interface/register.if';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export default class RegisterService {
//   constructor(@InjectModel(register.name) private UserModel: Model<register>) {}

//   async signup(signupData: IRegistration) {
//     const { email, password, name } = signupData;
//     const emailInUse = await this.UserModel.findOne({
//       email: signupData.email,
//     });
//     if (emailInUse) {
//       throw new BadRequestException('Email already in use');
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const createdAdmin = new this.UserModel({
//       ...signupData, 
//       password: hashedPassword
//     });
//     console.log(createdAdmin,'createdAdmin', signupData,"signupData")
//     return createdAdmin.save()
//   }
//   // @UsePipes(new JoiValidationPipe(registerSchema))
//   // getMainReferId(@Body() body: any): string {
//   //   return 'Hello World!';
//   // }
// }

// // import { Injectable } from '@nestjs/common';
// // import { JwtService } from '@nestjs/jwt';

// // @Injectable()
// // export class AuthService {
// //   constructor(private readonly jwtService: JwtService) {}

// //   async login(user: any) {
// //     const payload = { username: user.username, sub: user.userId };
// //     return {
// //       access_token: this.jwtService.sign(payload),
// //     };
// //   }
// // }
