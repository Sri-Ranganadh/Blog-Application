import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post, PostSchema } from './posts.schema';
import { Document } from 'mongoose';

@Schema({ id: true, timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: [PostSchema], required: false, default: [] })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
