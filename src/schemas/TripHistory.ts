
import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const tripHistory = new Schema({
  sacco: {
    type: ObjectId,
    ref: "Sacco",
    required: true,
    immutable: true,
  },
  currentLocation: {
    type: String,
    required: true,
    immutable: true,
  },
  currentStation: {
    type: ObjectId,
    ref: "Station",
    required: false,
    immutable: true,
  },
  availability: {
    type: ObjectId,
    ref: "Availability",
    required: false,
    immutable: true,
  },
  vehicle: {
    type: ObjectId,
    ref: "Vehicle",
    required: true,
    immutable: true,
  },
  recievedBy: {
    type: String,
    required: true,
    immutable: true,
  },
  arrivedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const tripHistoryModel = model("TripHistory", tripHistory);
