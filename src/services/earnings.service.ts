import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Earning } from 'src/schemas/earnings.schema';

@Injectable()
export class earningService {
  constructor(
    @InjectModel('Earning') private earningModel: mongoose.Model<Earning>,
  ) {}

  // Get Totol Royalty Earning
  async getRoyaltyEarning() {
    try {
      const earning = await this.earningModel.aggregate([
        {
          $match: { type: 'millionaire-royalty' },
        },
        {
          $group: {
            _id: null,
            earning: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            earning: 1,
          },
        },
      ]);
      console.log(earning);
      return earning[0].earning;
    } catch (error) {
      console.error('Error fetching royalty earnings:', error);
      return 0;
    }
  }
}
