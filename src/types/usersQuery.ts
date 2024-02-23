import { ObjectId } from 'mongodb';

export interface UsersQuery {
  station?: ObjectId | string;
  sacco?: ObjectId | string;
  role?: string | string[];
  _id?: ObjectId | string;
}
