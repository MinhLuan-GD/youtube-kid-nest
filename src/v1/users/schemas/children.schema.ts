import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';

@Schema()
export class Children {
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

  @Prop({ default: new Video(), type: [VideoSchema] })
  videos: Video[];
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);
