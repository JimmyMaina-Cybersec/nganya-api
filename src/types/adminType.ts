
export default interface AdminType {
  id?: string;
  idNo: string;
  name: string;
  phone: string;
  email: string;
  level: number;
  rating: number;
  sacco: string;

  picture: string;
  addedOn: Date;
  addedBy: string;
  updatedOn?: Date;
}
