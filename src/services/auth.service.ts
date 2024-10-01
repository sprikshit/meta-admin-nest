// auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { IRegistration } from 'src/interface/register.if';
import { Register } from 'src/schemas/register.schema';
import { register } from 'module';
import { ILogin } from 'src/interface/login.if';
import JoiValidationPipe from 'src/validation/joi-validation.pipe';
import { registerSchema } from 'src/validation/';
// import { register } from 'module';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(register.name) private UserModel: Model<Register>,

    private jwtService: JwtService,
  ) {}

  // Register function for creating a new user with a hashed password
  // @UsePipes(new JoiValidationPipe(registerSchema))
  async register(signupData: IRegistration) {
    const { email, password, name } = signupData;
    console.log(signupData)
    const emailInUse = await this.UserModel.findOne({
      email: signupData.email,
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAdmin = new this.UserModel({
      ...signupData,
      password: hashedPassword,

    });
    console.log(createdAdmin, 'createdAdmin', signupData, 'signupData');
    return createdAdmin.save();
  }

  async login(loginData: ILogin) {
    const { email, password } = loginData;

    const user = await this.UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.name, sub: user._id };
    console.log(payload)
    return {

      access_token: this.jwtService.sign(payload),
    };
  }

  // async validateUser(userId: string) {
  //   return this.UserModel.findById(userId);
  // }
}
