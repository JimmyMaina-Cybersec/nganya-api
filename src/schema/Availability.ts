import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const availability = new Schema({
  depatureStation: {
    type: ObjectId,
    ref: "Station",
    required: true,
  },
  finalDestinationStation: {
    type: ObjectId,
    ref: "Station",
    required: true,
  },
  dropOffLocations: {
    type: Array<String>,
    default: [],
  },
  dropOffPrices: {
    type: Array<Object>,
    default: [],
  },

  depatureTime: {
    type: Date,
    required: false,
  },
  arrivalTime: {
    type: Date,
    required: false,
  },
  vehicle: {
    type: ObjectId,
    ref: "Vehicle",
    required: true,
  },
  bookedSeates: {
    type: Array,
    default: [],
  },
  sacco: {
    type: ObjectId,
    ref: "Sacco",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "available",
  },
  addedOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  addedBy: {
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
export const availabilityModel = model("Availability", availability);
