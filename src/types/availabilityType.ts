export default interface AvailabilityType {
  id?: string;
  depatureLocation: string;
  vehicleID: string;
  vehicleCapacity: number;
  depatureTime: Date;
  arrivalTime?: Date;
  bookedSeats: string[];
  destinations: string;
  sacco: string;
  saccoName: string;
  lastDestination: string;
  depatureStation: string;
  inStation: boolean;
}
