// auth.controller.ts
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { sign } from 'crypto';
import { AuthService } from 'src/services/auth.service';
import { registerSchema } from 'src/validation';
import JoiValidationPipe from 'src/validation/joi-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new JoiValidationPipe(registerSchema))
  @Post('register')
  async register(@Body() signupData) {
    return this.authService.register(signupData);
  }

  // @UsePipes(new JoiValidationPipe(registerSchema))
  @Post('login')
  async login(@Body() loginData) {
    return this.authService.login(loginData);
  }
}
