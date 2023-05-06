import { ObjectId } from 'mongodb';
import { Permission } from './permission';

export class JwtPayload {
  _id: ObjectId;
  sub: ObjectId;
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
  sacco: ObjectId;
  station?: ObjectId;
  permission?: Permission;
}
