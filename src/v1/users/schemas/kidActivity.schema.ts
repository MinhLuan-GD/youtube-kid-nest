import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activity.schema';

@Schema({ _id: false, timestamps: true })
export class KidActivity {
  @Prop({ required: true, unique: true })
  childrenId: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  picture: string;

  @Prop({
    default: 'video',
    enum: ['video', 'search', 'profile', 'channel', 'chat', 'secret_key'],
  })
  type: string;

  @Prop({ type: ActivitySchema, default: new Activity() })
  activity: Activity;

  createdAt: string;
  updatedAt: string;
}

export const KidActivitySchema = SchemaFactory.createForClass(KidActivity);
