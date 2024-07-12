import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({timestamps:true, id:true,collection:'comments'})
export class Comment extends Document {
  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  userId: MongooseSchema.Types.ObjectId;

  
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
