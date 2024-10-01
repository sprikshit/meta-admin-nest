
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Pkg extends Document {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  pkg: number;

  @Prop({ required: true })
  cycle: number;

  @Prop({ required: true })
  isRoyalty: boolean;

  @Prop({ required: true })
  isRecycle15: boolean;

  @Prop({ required: true })
  isRecycle16: boolean;

  @Prop({ required: true })
  pkgPrice: number;

  @Prop({ required: true })
  transaction_id: string;

  @Prop({ required: true })
  pkgType: string;

  @Prop({ required: true })
  upline1: string;

  @Prop({ required: true })
  upline2: string;

  @Prop({ required: true })
  levelUpline1: string;

  @Prop({ required: true })
  levelUpline2: string;

  @Prop({ required: true })
  levelUpline3: string;

  @Prop({ required: true })
  levelUpline4: string;

  @Prop({ required: true })
  levelUpline5: string;

  @Prop({ required: true })
  processedMissing: boolean;
}

// Create the Mongoose schema
export const PkgSchema = SchemaFactory.createForClass(Pkg);
