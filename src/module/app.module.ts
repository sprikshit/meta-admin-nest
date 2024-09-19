import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import RegisterController from 'src/controllers/register.controller';
import RegisterService from 'src/services/register.service';

@Module({
  imports: [],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class AppModule {}
