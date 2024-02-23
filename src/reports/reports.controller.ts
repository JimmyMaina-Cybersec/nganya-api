import { Controller, Get, Param, SetMetadata, UseGuards, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { UserPermissions } from 'src/types/PermissionType';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // agent (READ_AGENT_''_REPORT)
  // -parcels, bookings and money collections for the agent
  @SetMetadata('permissions', UserPermissions.READ_AGENT_PARCELS_REPORT)
  @Get('/agent-report/parcels')
  findAgentParcelReport(@CurrentUser() agent: JwtPayload, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findAgentParcelReport(agent, date);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENT_BOOKINGS_REPORT)
  @Get('/agent-report/bookings')
  findAgentBookingsReport(@CurrentUser() agent: JwtPayload, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findAgentBookingsReport(agent, date);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENT_COLLECTIONS_REPORT)
  @Get('/agent-report/money-collections')
  findAgentCollectionsReport(@CurrentUser() agent: JwtPayload, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findAgentCollectionsReport(agent, date);
  }

  // manager(READ_AGENTS_''_REPORTS)
  // -parcels, bookings and money collections for the station
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_PARCELS_REPORTS)
  @Get('/manager-report/parcels')
  findManagerParcelReport(@CurrentUser() manager: JwtPayload, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findManagerParcelReport(manager, date);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_BOOKINGS_REPORTS)
  @Get('/manager-report/bookings')
  findManagerBookingsReport(@CurrentUser() manager: JwtPayload, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findManagerBookingsReport(manager, date);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_COLLECTIONS_REPORTS)
  @Get('/manager-report/money-collections')
  findManagerCollectionsReport(@CurrentUser() manager: JwtPayload, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findManagerCollectionsReport(manager, date);
  }

  // administrator and gen admin (READ_STATIONS_''_REPORTS)
  // -parcels, bookings and money collections for any station
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_PARCELS_REPORTS)
  @Get('/station/parcels/:stationId')
  findStationParcelsReports(@Param(':stationId') stationId: string, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findStationParcelsReports(stationId, date);
  }
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_BOOKINGS_REPORTS)
  @Get('/station/bookings/:stationId')
  findStationBookingsReports(@Param(':stationId') stationId: string, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findStationBookingsReports(stationId, date);
  }
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_COLLECTIONS_REPORTS)
  @Get('/station/money-collections/:stationId')
  findStationCollectionsReports(@Param(':stationId') stationId: string, @Query('date') date: string = new Date().toISOString().split('T')[0]) {
    return this.reportsService.findStationCollectionsReports(stationId, date);
  }
}
