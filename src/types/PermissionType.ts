export enum UserPermissions {
  CREATE_SACCO_USERS = 'create:saccoUsers',
  READ_SACCO_USERS = 'read:saccoUsers',
  UPDATE_SACCO_USERS = 'update:saccoUsers',
  DELETE_SACCO_USERS = 'delete:saccoUsers',

  READ_SERVICE_AGENTS = 'read:stationServiceAgents',
  CREATE_SERVICE_AGENTS = 'create:stationServiceAgents',
  UPDATE_SERVICE_AGENTS = 'update:stationServiceAgents',
  DELETE_SERVICE_AGENTS = 'delete:stationServiceAgents',

  READ_STATION_MANAGERS = 'read:stationManagers',
  CREATE_STATION_MANAGERS = 'create:stationManagers',
  UPDATE_STATION_MANAGERS = 'update:stationManagers',
  DELETE_STATION_MANAGERS = 'delete:stationManagers',

  READ_ADMINS = 'read:admins',
  CREATE_ADMINS = 'create:admins',
  UPDATE_ADMINS = 'update:admins',
  DELETE_ADMINS = 'delete:admins',

  READ_STATIONS = 'read:stations',
  CREATE_STATIONS = 'create:stations',
  UPDATE_STATIONS = 'update:stations',
  DELETE_STATIONS = 'delete:stations',

  READ_SACCOS = 'read:saccos',
  CREATE_SACCO = 'create:sacco',
  UPDATE_SACCO = 'update:sacco',
  DELETE_SACCO = 'delete:sacco',

  CREATE_ROUTES = 'create:routes',

  READ_SACCO_REPORTS = 'read:saccoReports',

  READ_SERVICE_AGENTS_REPORTS = 'read:serviceAgentsReports',

  READ_SERVICE_AGENT_REPORTS = 'read:serviceAgentReport',

  READ_STATION_MANAGERS_REPORTS = 'read:stationManagersReports',

  READ_ADMINS_REPORTS = 'read:adminsReports',

  READ_STATIONS_REPORTS = 'read:stationsReports',
  READ_STATION_REPORTS = 'read:stationsReports',

  BOOK_TICKET = 'create:tickets',
  READ_TICKETS = 'read:tickets',
  UPDATE_TICKETS = 'update:tickets',

  BOOK_PARCEL = 'create:parcels',
  READ_PARCELS = 'read:parcels',
  UPDATE_PARCELS = 'update:parcels',

  READ_TICKET_REPORTS = 'read:ticketReports',
  READ_PARCEL_REPORTS = 'read:parcelReports',

  CREATE_VEHiCLE_OWNER = 'create:vehicleOwner',
  READ_VEHiCLE_OWNER = 'read:vehicleOwner',
  UPDATE_VEHiCLE_OWNER = 'update:vehicleOwner',
  DELETE_VEHiCLE_OWNER = 'delete:vehicleOwner',

  CREATE_VEHICLE = 'create:vehicle',
  READ_VEHICLES = 'read:vehicles',
  UPDATE_VEHICLE = 'update:vehicle',
  DELETE_VEHICLE = 'delete:vehicle',
  ADD_VEHICLE_TO_STATION = 'update:addVehicleToStation',
  READ_STATION_VEHICLE = 'read:stationVehicles',

  CREATE_DRIVER = 'create:driver',
  READ_DRIVERS = 'read:drivers',
  UPDATE_DRIVER = 'update:driver',
  ASSIGN_DRIVER = 'update:assignDriver',
  DELETE_DRIVER = 'delete:driver',

  ASSIGN_STATION_MANAGER = 'update:assignStationManager',
  ASSIGN_SERVICE_AGENT = 'update:assignServiceAgent',
}
