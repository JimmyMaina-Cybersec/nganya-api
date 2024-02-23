import { ObjectId } from 'mongodb';

export interface TicketQuery {
  addedBy?: ObjectId | string;
  station?: ObjectId | string;
  sacco?: ObjectId | string;
}
