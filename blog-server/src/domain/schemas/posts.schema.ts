import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';

@Schema({ id: true, timestamps: true, collection: 'posts' })
export class Post extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  subTitle: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false })
  imageURL: string;

  @Prop({ type: [CommentSchema], required: false, default: [] })
  comments: Comment[];

  @Prop({ type: Number, required: false, default: 0 })
  likes: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
