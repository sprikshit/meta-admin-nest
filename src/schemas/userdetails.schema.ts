import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class userdetails extends Document {
  @Prop({ required: true })
  userAddress: string;

  @Prop({ default: 0 })
  globalPkgCount: number;

  @Prop({ default: 0 })
  matrixPkgCount: number;

  @Prop({ default: false })
  isActive: boolean;
}

export const UserdetailsSchema = SchemaFactory.createForClass(userdetails);
