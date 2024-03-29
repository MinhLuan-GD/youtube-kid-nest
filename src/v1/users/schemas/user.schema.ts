import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Children, ChildrenSchema } from './children.schema';
import { KidActivity, KidActivitySchema } from './kidActivity.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  _id: string;

  @Prop({ required: true, unique: true })
  google_id: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  secret_password: string;

  @Prop({ default: '' })
  picture: string;

  @Prop({ default: [], type: [ChildrenSchema] })
  childrens: Children[];

  @Prop({ type: [KidActivitySchema], default: [] })
  kids_activity: KidActivity[];

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
