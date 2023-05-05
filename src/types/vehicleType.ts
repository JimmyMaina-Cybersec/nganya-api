import { SaccoType } from "./saccoType";
import UserType from "./userTypes";
export default interface VehicleType {
  _id?: string;
  plateNo: string;
  color: string;
  make: string;
  model: string;
  year: number;
  owner: UserType | string;
  type: "bus" | "mini bus" | "taxi" | "truck" | "van" | "other" | "car";
  seatLayout: Array<Array<string>>;
  capacity: number;
  sacco: SaccoType;
  addedBy: UserType | string;
  addedOn: Date;
  status:
    | "unassigned"
    | "in station"
    | "out of service"
    | "in maintenance"
    | "deleted"
    | "in route";
  updatedOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  imageURL?: string;
  driver?: UserType;
  inQueue?: boolean;
  lastAvailability?: string;
  deletedOn?: Date;
  deletedBy?: string;

  lastStation?: string;
  destinationStation?: string;
}
