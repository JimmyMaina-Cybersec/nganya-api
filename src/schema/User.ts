import { saccoModel } from "./Sacco";
import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { rolesSchema } from "./Roles";
import { stationModel } from "./Station";

const userSchema = new Schema({
  uid: {
    type: String,
    required: false,
  },
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
  password: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  email: {
    type: String,
    required: false,
  },
  photoURL: {
    type: String,
    required: true,
  },
  sacco: {
    type: ObjectId,
    ref: saccoModel,
    required: false,
  },
  station: {
    type: ObjectId,
    ref: stationModel,
    required: false,
  },
  vehicle: {
    type: ObjectId,
    ref: "Vehicle",
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  roles: {
    type: rolesSchema,
    required: false,
  },
  status: {
    type: String,
    default: "active",
  },
  addedOn: {
    immutable: true,
    type: Date,
    default: () => Date.now(),
  },
  addedBy: {
    type: ObjectId,
    immutable: true,
    ref: "User",
    required: false,
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
  isDeleted: {
    type: Boolean,
    default: false,
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
  refreshToken: {
    type: String,
    required: false,
  },
});

export const userModel = model("User", userSchema);
