import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const vehicleOwner = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  idNo: {
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
    required: true,
  },

  vehicles: {
    type: Array<ObjectId>,
    ref: "Vehicle",
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
 const vehicleOwnerModel = model("VehicleOwner", vehicleOwner);
