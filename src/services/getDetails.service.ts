import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user } from 'src/schemas/user.schema';
import * as mongoose from 'mongoose';
import { HelperService } from './helper';
import { Pkg } from 'src/schemas/pkgs.schema';
import { userdetails } from 'src/schemas/userdetails.schema';

@Injectable()
export class Userservice {
  constructor(
    @InjectModel('user') private readonly userModel: mongoose.Model<user>,
    @InjectModel('Pkg') private pkgsModel: mongoose.Model<Pkg>,
    @InjectModel('userdetails')
    private userdetailsModel: mongoose.Model<userdetails>,
  ) {}

  // Get total user count
  async getAllUsersCount(): Promise<any> {
    try {
      const allUsers = await this.userModel.countDocuments();
      return  allUsers 
    } catch (error) {
      console.log(error);
      return 0 ;
    }
  }

  //All users Count According Time range
  async getUsersCountByTimePeriod(timeRange: string): Promise<number> {
    try {
      const timeModifier = new HelperService();
      const startDate = timeModifier.getStartDateByTimeRange(timeRange);

      // console.log(`Start Date for ${timeRange}:`, startDate);
      let count = await this.userModel.aggregate([
        {
          $match: {
            createdAt: { $gt: startDate },
          },
        },
        {
          $count: 'count',
        },
      ]);
      // console.log(startDate);
      // console.log(count);
      return count.length > 0 ? count[0].count : 0;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  // Count for Pro-Power-Matrix
  async countProPowerMatrix(timeRange: any) {
    try {
      const timeModifier = new HelperService();
      const startDate = timeModifier.getStartDateByTimeRange(timeRange);
      console.log(`Start Date for ${timeRange}:`, startDate);
      const count = await this.pkgsModel.aggregate([
        {
          $match: {
            pkgType: 'pro-power-matrix',
            createdAt: { $gte: startDate },
          },
        },
        {
          $count: 'count',
        },
      ]);
      console.log(
        `Count of pro-power-matrix documents from ${startDate}:`,
        count,
      );
      // return count[0].count;
      return count.length > 0 ? count[0].count : 0;
    } catch (error) {
      console.error('Error counting pro-power-matrix documents:', error);
      return 0;
    }
  }

  //Count for Pro-Power-Global
  async countProPowerGlobal(timeRange: any) {
    try {
      const timeModifier = new HelperService();
      const startDate = timeModifier.getStartDateByTimeRange(timeRange);

      console.log(`Start Date for ${timeRange}:`, startDate);
      const count = await this.pkgsModel.aggregate([
        {
          $match: {
            pkgType: 'pro-power-global',
            createdAt: { $gte: startDate },
          },
        },
        {
          $count: 'count',
        },
      ]);
      console.log(
        `Count of pro-power-global documents from ${startDate}:`,
        count,
      );
      return count.length > 0 ? count[0].count : 0;
    } catch (error) {
      console.error('Error counting pro-power-global documents:', error);
      return 0;
    }
  }

  // Count of all Active Users
  async getActiveUsersCount(): Promise<any> {
    try {
      const count = await this.userdetailsModel.countDocuments({
        isActive: true,
      });
      return count
    } catch (error) {
      console.log(error);
      return  0 ;
    }
  }

  // Count of all Inactive Users
  async getInactiveUsersCount(): Promise<any> {
    try {
      const count = await this.userdetailsModel.countDocuments({
        isActive: false,
      });
      return count 
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
  
}
