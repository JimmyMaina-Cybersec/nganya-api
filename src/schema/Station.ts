import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const station = new Schema({
  name: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  photoURL: {
    type: String,
    required: false,
  },
  destinations: {
    type: Array<String>,
    ref: "Station",
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
    default: "active",
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
export const stationModel = model("Station", station);
