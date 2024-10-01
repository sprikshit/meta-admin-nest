import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Register extends Document {  

    @Prop({ required: true }) 
    name: string;

    @Prop({ required: true, unique: true })  
    email: string;

    @Prop({ required: true }) 
    password: string;

    // Uncomment if needed
    // @Prop()
    // role: number;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
