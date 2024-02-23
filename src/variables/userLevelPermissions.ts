import { UserPermissions } from '../types/PermissionType';

export const serviceAgentPermissions = [
  UserPermissions.BOOK_TICKET,
  UserPermissions.READ_TICKETS,
  UserPermissions.UPDATE_TICKETS,
  UserPermissions.READ_SERVICE_AGENT_REPORTS,
  UserPermissions.BOOK_PARCEL,
  UserPermissions.READ_PARCELS,
  UserPermissions.UPDATE_PARCELS,
];

export const stationManagerPermissions = [
  ...serviceAgentPermissions,
  UserPermissions.READ_STATION_REPORTS,
  UserPermissions.CREATE_SERVICE_AGENTS,
  UserPermissions.READ_SERVICE_AGENTS,
  UserPermissions.UPDATE_SERVICE_AGENTS,
  UserPermissions.DELETE_SERVICE_AGENTS,
  // UserPermissions.READ_STATIONS,
];

export const saccoAdminPermissions = [
  ...stationManagerPermissions,
  UserPermissions.READ_STATIONS,
  UserPermissions.CREATE_STATIONS,
  UserPermissions.UPDATE_STATIONS,
  UserPermissions.DELETE_STATIONS,
  UserPermissions.CREATE_SACCO_USERS,
  UserPermissions.UPDATE_SACCO_USERS,
  UserPermissions.DELETE_SACCO_USERS,
  UserPermissions.READ_SACCO_USERS,
];

export const generalAdminPermissions = [
  ...saccoAdminPermissions,
  UserPermissions.CREATE_ADMINS,
  UserPermissions.UPDATE_ADMINS,
  UserPermissions.DELETE_ADMINS,
];
