import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Sacco } from 'src/saccos/schema/sacco.schema';
import { Permission } from 'src/types/permission';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
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
    type: SchemaTypes.ObjectId,
    ref: 'Vehicle',
    required: false,
  })
  vehicle: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Sacco',
    required: false,
  })
  sacco: Types.ObjectId | string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Station',
    required: false,
  })
  station: Types.ObjectId | string;

  @Prop({ required: true })
  role:
    | 'Super User'
    | 'general admin'
    | 'admin'
    | 'station manager'
    | 'accountant'
    | 'station agent'
    | 'driver';

  @Prop({ required: false })
  permission: Permission;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ default: null, required: false })
  lastLogin: Date;

  @Prop({ default: () => Date.now() })
  addedOn: Date;

  @Prop({ default: () => Date.now() })
  upadatedAt: Date;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
  })
  addedBy: Types.ObjectId | string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
  })
  updatedBy: Types.ObjectId | string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
  })
  deletedBy: Types.ObjectId | string;

  @Prop({ default: false })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
