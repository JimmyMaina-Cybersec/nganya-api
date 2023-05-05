import { ObjectId } from "bson";
import { Schema, model } from "mongoose";

const saccoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  primaryColor: {
    type: String,
    required: false,
  },
  secondaryColor: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
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

export const saccoModel = model("Sacco", saccoSchema);
