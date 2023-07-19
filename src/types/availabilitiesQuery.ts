import { ObjectId } from 'mongodb';

export interface AvailabilityQuery {
  sacco?: ObjectId | string;
  station?: ObjectId | string;
}
