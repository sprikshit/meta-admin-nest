import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { AuthService } from 'src/services/auth.service';
import { register } from 'module';
import { RegisterSchema } from 'src/schemas/register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: register.name, schema: RegisterSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'JWT_SECRETs',
      signOptions: { expiresIn: '24h' }, 
      global:true
    }),
  ],
  controllers:[AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
