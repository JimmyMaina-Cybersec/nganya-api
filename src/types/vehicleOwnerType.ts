import { SaccoType } from "./saccoType";
import UserType from "./userTypes";
export default interface VehicleOwnerType {
  _id?: string;
  idNo: string;
  firstName: string;
  secondName: string;

  address?: string;
  phone: string;
  email: string;
  vehicles: string[];
  photoURL: string;
  sacco: SaccoType | string;
  addedOn: Date;
  addedBy: UserType | string;
  updatedOn?: Date;
  updatedBy?: UserType | string;
}
