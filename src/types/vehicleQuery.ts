import { ObjectId } from 'mongodb';

export interface VehicleQuery {
  owner?: ObjectId | string;
  sacco?: ObjectId | string;
}
