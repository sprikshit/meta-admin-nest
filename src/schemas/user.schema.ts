
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class user extends Document {
  @Prop({ required: true, unique: true })
  unique_id: number;

  @Prop({ required: true, unique: true })
  transaction_id: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  ref: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

// Generate the schema
export const userSchema = SchemaFactory.createForClass(user);
