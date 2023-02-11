import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class VideoHistory {
  @Prop({ default: '' })
  videoId: string;

  @Prop({ default: '' })
  channelId: string;

  @Prop({ default: '' })
  thumbnail: string;

  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  duration: string;
}

export const VideoHistorySchema = SchemaFactory.createForClass(VideoHistory);
