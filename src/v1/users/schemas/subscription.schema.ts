import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Subscription {
  @Prop({ required: true, unique: true })
  channelId: string;

  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  picture: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
