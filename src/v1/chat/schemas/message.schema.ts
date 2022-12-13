import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  _id: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  picture: string;

  @Prop({ default: '' })
  text: string;

  createdAt: Date;
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
