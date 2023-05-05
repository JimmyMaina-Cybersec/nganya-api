export default interface StationType {
  _id?: string;
  name: string;
  street: string;
  location: string;
  sacco: string;
  phone: string;
  destinations: string[];
  addedBy: string;
  addedOn: Date;
}
