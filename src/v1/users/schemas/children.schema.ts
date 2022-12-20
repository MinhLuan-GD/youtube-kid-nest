import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {
  ApprovedContent,
  ApprovedContentSchema,
} from './approvedContent.schema';
import { Subscription, SubscriptionSchema } from './subscription.schema';
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

  @Prop({ default: [], type: [ApprovedContentSchema] })
  approvedContent: ApprovedContent[];

  @Prop({ default: [], type: [VideoHistorySchema] })
  historyWatchVideo: VideoHistory[];

  // @Prop({ default: true })
  // setTime: boolean;

  @Prop({ default: 60 })
  timeExpire: number;

  @Prop({ default: [] })
  block_video: string[];

  @Prop({ default: true })
  allow_search: boolean;

  @Prop({ default: [], type: [SubscriptionSchema] })
  subscriptions: Subscription[];

  @Prop({ default: [] })
  block_channel: string[];

  @Prop({ default: true })
  allow_chat: boolean;
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);
