import { ObjectId } from 'mongoose';

export interface StationQuery {
  sacco?: ObjectId | string;
}
