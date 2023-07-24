import { ObjectId } from 'mongodb';

export interface VehicleQuery {
  owner?: ObjectId | string;
  sacco?: ObjectId | string;
  $or?: Array<
    | { lastStation?: ObjectId | string }
    | { currentStation?: ObjectId | string }
    | { nextStation?: ObjectId | string }
  >;
}
