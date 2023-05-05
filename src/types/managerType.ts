import { Timestamp } from "firebase/firestore";

export default interface ManagerType {
  id?: string;
  idNo: string;
  name: string;
  phone: string;
  email?: string;
  level: number;
  sacco: string;

  station: string;
  rating: number;
  picture: string;
  employedOn: Timestamp;
  addedOn: Timestamp;
  addedBy: string;
  updatedOn?: Timestamp;
}
