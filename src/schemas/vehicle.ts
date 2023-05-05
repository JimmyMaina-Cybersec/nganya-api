import { ObjectId } from "bson";
import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  plateNo: string;

  @Prop({ required: true })
  make: string;
  
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  imageURL: string;

  @Prop({ type: ObjectId, ref: "User", required: false })
  driver: string;

  @Prop({ type: ObjectId, ref: "VehicleOwner", required: true })
  owner: string;

  @Prop({ type: ObjectId, ref: "Sacco", required: true })
  sacco: string;

  @Prop({ default: () => Date.now() })
  addedOn: Date;

  @Prop({ default: () => Date.now() })
  updatedOn: Date;

  @Prop({ default: "active" })
  status: string;
  
  @Prop({ type: ObjectId, ref: "Station", required: false })
  lastStation: string;

  @Prop({ type: ObjectId, ref: "Station", required: false })
  currentStation: string;

  @Prop({ type: ObjectId, ref: "Station", required: false })
  nextStation: string;

}





// const vehicle = new Schema({
//   plateNo: {
//     type: String,
//     required: true,
//   },
//   make: {
//     type: String,
//     required: true,
//   },
//   model: {
//     type: String,
//     default: "",
//   },
//   year: {
//     type: Number,
//     default: 2010,
//   },
//   color: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   imageURL: {
//     type: String,
//     required: false,
//   },

//   driver: {
//     type: ObjectId,
//     ref: "User",
//     required: false,
//   },
//   owner: {
//     type: ObjectId,
//     ref: "VehicleOwner",
//     required: true,
//   },
//   sacco: {
//     type: ObjectId,
//     ref: "Sacco",
//     required: true,
//   },
//   seatLayout: {
//     type: Array,
//     default: [
//       ["A1", "A2", "Driver"],
//       ["A3", "A4", "A5"],
//       ["A6", "A7", "A8"],
//       ["A9", "A10", "A11"],
//     ],
//   },

//   status: {
//     type: String,
//     required: true,
//     default: "unassigned",
//   },

//   lastStation: {
//     type: ObjectId,
//     ref: "Station",
//     required: false,
//   },
//   destinationStation: {
//     type: ObjectId,
//     ref: "Station",
//     required: false,
//   },

//   addedOn: {
//     type: Date,
//     default: () => Date.now(),
//     immutable: true,
//   },
//   addedBy: {
//     type: ObjectId,
//     ref: "User",
//     required: true,
//     immutable: true,
//   },
//   updatedOn: {
//     type: Date,
//     required: false,
//   },
//   updatedBy: {
//     type: ObjectId,
//     ref: "User",
//     required: false,
//   },
//   deletedOn: {
//     type: Date,
//     required: false,
//   },
//   deletedBy: {
//     type: ObjectId,
//     ref: "User",
//     required: false,
//   },
// });
// const vehicleModel = model("Vehicle", vehicle);
