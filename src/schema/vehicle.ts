import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const vehicle = new Schema({
  plateNo: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    default: "",
  },
  year: {
    type: Number,
    default: 2010,
  },
  color: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },

  driver: {
    type: ObjectId,
    ref: "User",
    required: false,
  },
  owner: {
    type: ObjectId,
    ref: "VehicleOwner",
    required: true,
  },
  sacco: {
    type: ObjectId,
    ref: "Sacco",
    required: true,
  },
  seatLayout: {
    type: Array,
    default: [
      ["A1", "A2", "Driver"],
      ["A3", "A4", "A5"],
      ["A6", "A7", "A8"],
      ["A9", "A10", "A11"],
    ],
  },

  status: {
    type: String,
    required: true,
    default: "unassigned",
  },

  lastStation: {
    type: ObjectId,
    ref: "Station",
    required: false,
  },
  destinationStation: {
    type: ObjectId,
    ref: "Station",
    required: false,
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
  deletedOn: {
    type: Date,
    required: false,
  },
  deletedBy: {
    type: ObjectId,
    ref: "User",
    required: false,
  },
});
export const vehicleModel = model("Vehicle", vehicle);
