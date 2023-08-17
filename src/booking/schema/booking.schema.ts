import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;
export class Booking {}
export const BookingSchema = SchemaFactory.createForClass(Booking);
