import { ObjectId } from 'bson';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from 'src/types/permission';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false })
  uid: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  secondName: string;

  @Prop({ required: true })
  idNo: string;

  @Prop({ default: '' })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: 1 })
  level: number;

  @Prop({ required: false })
  email: string;

  @Prop({ required: true })
  photoURL: string;

  @Prop({
    type: ObjectId,
    ref: 'Vehicle',
    required: false,
  })
  vehicle: string;

  @Prop({
    type: ObjectId,
    ref: 'Sacco',
    required: false,
  })
  sacco: string;

  @Prop({
    type: ObjectId,
    ref: 'Station',
    required: false,
  })
  station: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: false })
  permission: Permission;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ default: () => Date.now() })
  addedOn: Date;

  @Prop({ default: () => Date.now() })
  updatedOn: Date;

  @Prop({
    type: ObjectId,
    ref: 'User',
    required: false,
  })
  addedBy: User;

  @Prop({
    type: ObjectId,
    ref: 'User',
    required: false,
  })
  updatedBy: User;

  @Prop({
    type: ObjectId,
    ref: 'User',
    required: false,
  })
  deletedBy: User;

  @Prop({ default: false })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
