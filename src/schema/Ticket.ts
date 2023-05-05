import { customerSchema } from "./Customer";
import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const ticket = new Schema({
  bookedSeats: {
    type: Array<String>,
    required: true,
  },

  totalPaid: {
    type: Number,
    required: true,
  },
  pricePerSeat: {
    type: Number,
    required: true,
  },

  from: {
    type: ObjectId,
    ref: "Station",
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  lastCustomerStation: {
    type: ObjectId,
    ref: "Station",
    required: true,
  },

  customers: {
    type: [customerSchema],
    required: true,
  },

  billingNumber: {
    type: String,
    required: false,
  },

  mpesaTrasaction: {
    type: ObjectId,
    required: false,
  },
  paymentMode: {
    type: String,
    required: false,
  },
  availability: {
    type: ObjectId,
    ref: "Availability",
    immutable: true,
    required: true,
  },
  vehicle: {
    type: ObjectId,
    ref: "Vehicle",
    required: true,
  },
  sacco: {
    type: ObjectId,
    immutable: true,
    ref: "Sacco",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  bookedOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  bookingAgent: {
    type: ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  updatedOn: {
    type: Date,
    required: false,
  },
  updatedBy: {
    type: ObjectId,
    ref: "User",
    required: false,
  },
});
export const ticketModel = model("Ticket", ticket);
