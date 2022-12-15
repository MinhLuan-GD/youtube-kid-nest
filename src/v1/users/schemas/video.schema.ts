import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Video {
  @Prop({ default: '' })
  videoId: string;

  @Prop({ default: '' })
  thumbnail: string;

  @Prop({ default: '' })
  title: string;

  @Prop({ default: 'video', enum: ['video', 'channel'] })
  type: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
