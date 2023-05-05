import { Schema } from "mongoose";

export const rolesSchema = new Schema({
  
  canBookSeats: {
    type: Boolean,
    default: false,
  },
  canViewAgentsBookings: {
    type: Boolean,
    default: false,
  },
  canChangeStationSettings: {
    type: Boolean,
    default: false,
  },
  canAddUsers: {
    type: Boolean,
    default: false,
  },
  canAddVehicles: {
    type: Boolean,
    default: false,
  },
  canAddSaccos: {
    type: Boolean,
    default: false,
  },
  canAddStations: {
    type: Boolean,
    default: false,
  },
  canAddAgents: {
    type: Boolean,
    default: false,
  },
});
