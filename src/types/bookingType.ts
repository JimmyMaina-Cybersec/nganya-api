import customerDetailsType from "./customerDetailsType";

export default interface BookingType {
  seats: string[];
  availability: string;
  customerDetails: object;
  destination: string;
  departure: string;
  depatureStation: string;
  agent: string;
  sacco: string;
  agentName: string;
  saccoName: string;
  bookingDate: Date;
  departureDate: Date;
  pricePerSeat: number;
  totalPrice: number;
  transactionId: string | null;
  transactioRef: string | null;
  paymentMethode: string;
  vehicleID: string;
  vehicleType: string;
  bookingStatus: string;
  phone: string;
}
