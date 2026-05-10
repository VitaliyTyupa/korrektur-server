import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'dl_form',
  timestamps: true,
  versionKey: false,
  strict: false,
})
export class FormEntity {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, type: Object })
  form: any;
}

export const FormSchema = SchemaFactory.createForClass(FormEntity);
