import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) 
export class Earning extends Document {
  
  @Prop({ required: true })
  from: string;

  @Prop({ default: null })
  to: string | null;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Transaction' })
  transaction_id: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop()
  createdAt: Date;  

  @Prop()
  updatedAt: Date;  
}

// Create the schema
export const EarningSchema = SchemaFactory.createForClass(Earning);
