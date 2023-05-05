import { vehicleModel } from "./vehicle";
import { availabilityModel } from "./Availability";
import { saccoModel } from "./Sacco";
import { ObjectId } from "bson";
import { Schema, model } from "mongoose";
import { stationModel } from "./Station";
import { userModel } from "./User";

const tripHistory = new Schema({
  sacco: {
    type: ObjectId,
    ref: saccoModel,
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
    ref: stationModel,
    required: false,
    immutable: true,
  },
  availability: {
    type: ObjectId,
    ref: availabilityModel,
    required: false,
    immutable: true,
  },
  vehicle: {
    type: ObjectId,
    ref: vehicleModel,
    required: true,
    immutable: true,
  },
  recievedBy: {
    type: ObjectId,
    ref: userModel,
    required: true,
    immutable: true,
  },
  arrivedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

export const tripHistoryModel = model("TripHistory", tripHistory);
