import { Controller, Get } from '@nestjs/common';
import { earningService } from 'src/services/earnings.service';
import ResponseModel from 'src/utils/response.model';

@Controller('earnings')
export class earningController {
  constructor(private readonly earningService: earningService) {}

  //Get all royalty earning
  @Get('royalty-earning')
  async getRoyaltyEarning(): Promise<any> {
    try {
      const response = await this.earningService.getRoyaltyEarning();
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
