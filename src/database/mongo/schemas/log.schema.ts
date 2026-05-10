import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'dl_log',
  timestamps: false,
  versionKey: false,
  strict: false,
})
export class LogEntity {
  @Prop({ required: true, unique: true, index: true })
  id: string;
}

export const LogSchema = SchemaFactory.createForClass(LogEntity);
