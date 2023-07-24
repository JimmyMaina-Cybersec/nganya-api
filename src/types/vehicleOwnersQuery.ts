import { ObjectId } from 'mongodb';

export interface VehicleOwnersQuery {
  sacco?: ObjectId | string;
}
