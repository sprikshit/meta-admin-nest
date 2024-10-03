import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import RegisterController from 'src/controllers/register.controller';
// import RegisterService from 'src/services/register.service';
// import { RegisterModule } from './register.module';zzzzzzzz
import { userDetails } from './getDetails.module';
import { AuthModule } from './auth.module';
import { earningModule } from './earning.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    userDetails,
    AuthModule,
    earningModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
