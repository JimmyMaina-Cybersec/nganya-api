import { Schema, model } from "mongoose";

 const customerSchema = new Schema({
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
//  ticketModel = model("Ticket", ticket);
