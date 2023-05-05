import { Schema, model } from "mongoose";

export const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  secondName: {
    type: String,
    required: true,
  },

  customerID: {
    type: String,
    required: true,
  },

  customerPhone: {
    type: String,
    required: true,
  },

  seatNo: {
    type: String,
    required: false,
  },
});
// export const ticketModel = model("Ticket", ticket);
