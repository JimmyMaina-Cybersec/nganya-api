import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const parcel = new Schema({
  paymentID: {
    type: String,
    required: false,
  },
  paymentMode: {
    type: String,
    required: false,
  },
  shippingCost: {
    type: Number,
    required: true,
  },

  weight: {
    type: Number,
    required: true,
    default: 0,
  },
  parcelType: {
    type: String,
    required: true,
    default: "parcel",
  },
  parcelDescription: {
    type: String,
    required: false,
  },

  shipingVehicle: {
    type: ObjectId,
    ref: "Vehicle",
    required: false,
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
  // sendingCustomer: {
  //   type: customerSchema,
  //   required: true,
  // },
  // receivingCustomer: {
  //   type: customerSchema,
  //   required: true,
  // },
  sendingFrom: {
    type: ObjectId,
    ref: "Station",
    required: true,
  },
  sendingTo: {
    type: ObjectId,
    ref: "Station",
    required: true,
  },

  checkedInAtDepatureOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  checkedInAtDepatureBy: {
    type: ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  checkedOutAtDepatureOn: {
    type: Date,
    required: false,
  },
  checkedOutAtDepatureBy: {
    type: ObjectId,
    ref: "User",
    required: false,
  },
  checkedInAtDestinationOn: {
    type: Date,
    default: () => Date.now(),
  },
  checkedInAtDestinationBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },

  checkedOutAtDestinationOn: {
    type: Date,
    required: false,
  },
  checkedOutAtDestinationBy: {
    type: ObjectId,
    ref: "User",
    required: false,
  },
});
 const parcelModel = model("Parcel", parcel);
