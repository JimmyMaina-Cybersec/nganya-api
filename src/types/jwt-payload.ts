import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Permission } from './permission';

export class JwtPayload {
  _id: ObjectId | string;
  sub: ObjectId | string;
  firstName: string;
  secondName: string;
  idNo: string;
  phone: string;
  email: string;
  photoURL: string;
  role:
    | 'Super User'
    | 'general admin'
    | 'admin'
    | 'station manager'
    | 'accountant'
    | 'station agent'
    | 'driver';
  sacco: Types.ObjectId | string;
  station?: ObjectId | string;
  vehicle?: ObjectId | string;
  permission?: Permission;
}
