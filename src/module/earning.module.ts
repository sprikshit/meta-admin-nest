import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { earningController } from "src/controllers/earnings.controller";
import { Earning, EarningSchema } from "src/schemas/earnings.schema";
import { earningService } from "src/services/earnings.service";


@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'Earning', schema: EarningSchema },
      ]),
    ],
    controllers: [earningController],
    providers: [earningService],
  })
  export class earningModule {}