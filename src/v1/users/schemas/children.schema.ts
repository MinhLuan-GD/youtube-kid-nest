import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';
import { VideoHistory, VideoHistorySchema } from './videoHistory.schema';

@Schema()
export class Children {
  _id: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  year: string;

  @Prop({ default: '' })
  month: string;

  @Prop({ default: '' })
  secret_password: string;

  @Prop({ default: 'self-approval', enum: ['self-approval', 'kiddie', 'teen'] })
  content_settings: string;

  @Prop({ default: '' })
  picture: string;

  @Prop({ default: [], type: [VideoSchema] })
  videos: Video[];

  @Prop({ default: [], type: [VideoHistorySchema] })
  historyWatchVideo: VideoHistory[];
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);
