import { Controller,HttpException, HttpStatus, Post,UsePipes,Body, UseGuards } from '@nestjs/common';
import RegisterService from 'src/services/register.service';
import ResponseModel from 'src/utils/response.model';
//==============================API VALIDATION==============================
import JoiValidationPipe from 'src/validation/joi-validation.pipe';
import { IRegistration } from 'src/interface/register.if';
import { registerSchema } from 'src/validation';
//==============================JWT AUTH==============================
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';


//==============================CONTROLLER==============================
@Controller()
export default class RegisterController  {
  constructor(private readonly registerService: RegisterService) {} 

  @UseGuards(JwtAuthGuard)  
  @Post("register")
  @UsePipes(new JoiValidationPipe(registerSchema))
  async register(@Body() body:IRegistration ) {
    try {
      return  ResponseModel.setSuccess(200, 'Registration successful', {});
    } catch (error) {
      console.log('Error:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
