import { def } from "@vue/shared";
import { Timestamp } from "firebase/firestore";

export default interface MPesaCallBackType {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata?: {
    Item: {
      Name: string;
      Value: string;
    }[];
  };
  Timestamp: Timestamp;
}
