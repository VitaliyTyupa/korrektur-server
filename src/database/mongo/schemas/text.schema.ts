import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'dl_text',
  timestamps: true,
  versionKey: false,
  strict: false,
})
export class TextEntity {
  @Prop({ required: true, unique: true, index: true })
  id: string;
}

export const TextSchema = SchemaFactory.createForClass(TextEntity);
