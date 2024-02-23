import { ObjectId } from 'mongodb';

export interface PercelQuery {
  $or?: Array<
    | { sendingStation?: ObjectId | string }
    | { receivingStation?: ObjectId | string }
    | { sendingAgent?: ObjectId | string }
    | { pickupAgent?: ObjectId | string }
    | { recivingAgent?: ObjectId | string }
  >;
  sacco?: ObjectId | string;
}
