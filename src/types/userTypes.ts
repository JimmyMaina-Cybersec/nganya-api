import StationType from "~/types/stationType";
import { SaccoType } from "./saccoType";
export default interface UserType {
  _id?: string;
  uid: string;
  idNo: string;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  level?: number;
  rating?: number;
  sacco: SaccoType | string;
  vehicle?: string;
  addedOn: Date;
  addedBy?: string;
  updatedOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  role:
    | "Super User"
    | "general admin"
    | "admin"
    | "station manager"
    | "accountant"
    | "station agent"
    | "driver";

  station?: StationType;
  status?: string;
  photoURL: string | "https://api.dicebear.com/5.x/thumbs/svg";
}
