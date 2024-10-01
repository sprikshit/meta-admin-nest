import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Userservice } from '../services/getDetails.service';
import ResponseModel, { IResponse } from 'src/utils/response.model';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userservice: Userservice) {}

  //All Users count
  @Get('allUsersCount')
  async getAllUsersCount() {
    try {
      const response = await this.userservice.getAllUsersCount();
      return ResponseModel.setSuccess(200, 'successful', { response });
    } catch (error) {
      return ResponseModel.setError(
        500,
        'Failed to fetch user count',
        error.message,
      );
    }
  }

  // Count of users according to time
  @Get('userscount')
  async getUsersCount(
    @Query('timeRange') timeRange: string,
  ): Promise<IResponse> {
    try {
      const response =
        await this.userservice.getUsersCountByTimePeriod(timeRange);
      return ResponseModel.setSuccess(200, 'successful', { response });
    } catch (error) {
      // throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      return ResponseModel.setError(500, 'Internal Server Error', error);
    }
  }

  //Count for Pro-Power-Matrix
  @Get('countProPowerMatrix')
  async countProPowerMatrix(
    @Query('timeRange') timeRange: string,
  ): Promise<IResponse> {
    try {
      const response = await this.userservice.countProPowerMatrix(timeRange);
      return ResponseModel.setSuccess(200, 'successful', { response });
    } catch (error) {
      // throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      return ResponseModel.setError(500, 'Internal Server Error', error);
    }
  }

  //Count for Pro-Power-Global
  // @UseGuards(JwtAuthGuard)
  @Get('countProPowerGlobal')
  async countProPowerGlobal(
    @Query('timeRange') timeRange: string,
  ): Promise<IResponse> {
    try {
      const response = await this.userservice.countProPowerGlobal(timeRange);
      return ResponseModel.setSuccess(200, 'successful', { response });
    } catch (error) {
      // throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      return ResponseModel.setError(500, 'Internal Server Error', error);
    }
  }

  // Count of all Active Users
  @Get('countActiveUser')
  async getActiveUsersCount() {
    try {
      const response = await this.userservice.getActiveUsersCount();
      return ResponseModel.setSuccess(200, 'successful', { response });
    } catch (error) {
      return ResponseModel.setError(
        500,
        'Failed to fetch user count',
        error.message,
      );
    }
  }

  // Count of all Inctive Users
  @Get('countInactiveUser')
  async getInactiveUsersCount() {0
    try {
      const response = await this.userservice.getInactiveUsersCount();
      return ResponseModel.setSuccess(200, 'successful', {response});
    } catch (error) {
      return ResponseModel.setError(
        500,
        'Failed to fetch user count',
        error.message,
      );
    }
  }
}
