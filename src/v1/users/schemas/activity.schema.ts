import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Activity {
  @Prop({ default: '' })
  content: string;

  @Prop({ default: '' })
  videoId: string;

  @Prop({ default: '' })
  channelId: string;

  @Prop({ default: '' })
  new_name: string;

  @Prop({ default: '' })
  new_picture: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
