import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message, MessageSchema } from './message.schema';

export type ChatDocument = Chat & Document;

@Schema({ collection: 'chat' })
export class Chat {
  @Prop({ required: true, unique: true })
  video_id: string;

  @Prop({ default: [], type: [MessageSchema] })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
