import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Children, ChildrenSchema } from './children.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  secret_password: string;

  @Prop({ default: '' })
  picture: string;

  @Prop({ default: new Children(), type: [ChildrenSchema] })
  childrens: Children[];

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
