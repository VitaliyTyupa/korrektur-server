import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role } from '../../../user/user.interface';

@Schema({
  collection: 'dl_user',
  timestamps: true,
  versionKey: false,
})
export class UserEntity {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: Object.values(Role), required: true })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
