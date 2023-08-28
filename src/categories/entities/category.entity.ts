import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  categoryName: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  addedBy: string;

  @Prop({ type: String, default: null })
  updatedBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
