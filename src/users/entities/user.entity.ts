import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

@Schema()
export class UserEntity extends Document {
  //   @Prop({ required: false })
  //   uid: string;
  //   @Prop({ required: true })
  //   firstName: string;
  //   @Prop({ required: true })
  //   secondName: string;
  //   @Prop({ required: true })
  //   idNo: string;
  //   @Prop({ default: '' })
  //   password: string;
  //   @Prop({ required: true })
  //   phone: string;
  //   @Prop({ default: 1 })
  //   level: number;
  //   @Prop({ required: false })
  //   email: string;
  //   @Prop({ required: true })
  //   photoURL: string;
  //   @Prop({
  //     type: Types.ObjectId,
  //     ref: 'Vehicle',
  //     required: false,
  //   })
  //   vehicle: string;
  //   @Prop({
  //     type: Types.ObjectId,
  //     ref: 'Sacco',
  //     required: false,
  //   })
  //   sacco: Types.ObjectId;
  //   @Prop({
  //     type: Types.ObjectId,
  //     ref: 'Station',
  //     required: false,
  //   })
  //   station: Types.ObjectId;
  //   @Prop({ required: true })
  //   role:
  //     | 'Super User'
  //     | 'general admin'
  //     | 'admin'
  //     | 'station manager'
  //     | 'accountant'
  //     | 'station agent'
  //     | 'driver';
  //   @Prop({ required: false })
  //   permission: Permission;
  //   @Prop({ default: 'active' })
  //   status: string;
  //   @Prop({ default: null, required: false })
  //   lastLogin: Date;
  //   @Prop({ default: () => Date.now() })
  //   addedOn: Date;
  //   @Prop({ default: () => Date.now() })
  //   updatedOn: Date;
  //   @Prop({
  //     type: Types.ObjectId,
  //     ref: 'User',
  //     required: false,
  //   })
  //   addedBy: User;
  //   @Prop({
  //     type: Types.ObjectId,
  //     ref: 'User',
  //     required: false,
  //   })
  //   updatedBy: User;
  //   @Prop({
  //     type: Types.ObjectId,
  //     ref: 'User',
  //     required: false,
  //   })
  //   deletedBy: User;
  //   @Prop({ default: false })
  //   refreshToken: string;
}
