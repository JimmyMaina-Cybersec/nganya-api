import { Timestamp } from "firebase/firestore";
export default interface ParcelType {
  id?: string;
  senderName: string;
  senderPhone: string;
  senderIDNumber: string;
  sendingStation: string;
  sendingLocation: string;
  sendingAgent: string;
  sendingAgentName: string;
  sendingTime: Timestamp;

  recipientName: string;
  recipientPhone: string;
  recipientIDNumber: string;
  recivingStation: string;
  recivingLocation: string;
  recivingAgentName?: string;
  pickupTime?: Timestamp;
  recivingAgent?: string;
  aditioanalInfomation?: string;

  type:
    | "document"
    | "electronic"
    | "parcel"
    | "pallet"
  weightRange:
    | string
    | "0-1kg"
    | "1-5kg"
    | "5-10kg"
    | "10-20kg"
    | "20-50kg"
    | "50-100kg"
    | "100+";

  leftStationAt?: Timestamp;
  checkedOutAtSendingStationBy?: string;

  checkedInAtDestinationBy?: string;
  checkedInAt?: Timestamp;

  status:
    | "payment failed"
    | "awaiting transit"
    | "in transit"
    | "awaiting pickup"
    | "picked up"
    | "delivered"
    | "returned"
    | "lost"
    | "damaged"
    | "stolen";

  paymentStatus:
    | "paid"
    | "unpaid"
    | "pending"
    | "failed"
    | "cancelled"
    | "refunded";

  transactionID?: string;
  paymentMethod: "cash" | "M-Pesa" | "card";
  transactioRef?: string;
  vehicleId?: string;
  amount: number;
}
