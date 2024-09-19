import { Injectable, Get, Req, Res, HttpException, HttpStatus, Post,UsePipes,Body } from '@nestjs/common';
import { registerSchema } from 'src/validation';
import JoiValidationPipe from 'src/validation/joi-validation.pipe';



@Injectable()
export default class RegisterService {

  @UsePipes(new JoiValidationPipe(registerSchema))
  getMainReferId(@Body() body: any): string {
    return 'Hello World!';
  }

}



// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(private readonly jwtService: JwtService) {}

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
