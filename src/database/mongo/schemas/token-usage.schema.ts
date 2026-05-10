import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'dl_tokens_usage',
  timestamps: true,
  versionKey: false,
})
export class TokenUsageEntity {
  @Prop({ required: true, unique: true, index: true })
  userId: string;

  @Prop({ required: true, default: 0 })
  total_tokens: number;
}

export const TokenUsageSchema = SchemaFactory.createForClass(TokenUsageEntity);
