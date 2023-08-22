import { Controller, Get, Param, SetMetadata, UseGuards } from '@nestjs/common';
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
  findAgentParcelReport(@CurrentUser() agent: JwtPayload) {
    return this.reportsService.findAgentParcelReport(agent);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENT_BOOKINGS_REPORT)
  @Get('/agent-report/bookings')
  findAgentBookingsReport(@CurrentUser() agent: JwtPayload) {
    return this.reportsService.findAgentBookingsReport(agent);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENT_COLLECTIONS_REPORT)
  @Get('/agent-report/money-collections')
  findAgentCollectionsReport(@CurrentUser() agent: JwtPayload) {
    return this.reportsService.findAgentCollectionsReport(agent);
  }

  // manager(READ_AGENTS_''_REPORTS)
  // -parcels, bookings and money collections for the station
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_PARCELS_REPORTS)
  @Get('/manager-report/parcels')
  findManagerParcelReport(@CurrentUser() manager: JwtPayload) {
    return this.reportsService.findManagerParcelReport(manager);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_BOOKINGS_REPORTS)
  @Get('/manager-report/bookings')
  findManagerBookingsReport(@CurrentUser() manager: JwtPayload) {
    return this.reportsService.findManagerBookingsReport(manager);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_COLLECTIONS_REPORTS)
  @Get('/manager-report/money-collections')
  findManagerCollectionsReport(@CurrentUser() manager: JwtPayload) {
    return this.reportsService.findManagerCollectionsReport(manager);
  }

  // administrator and gen admin (READ_STATIONS_''_REPORTS)
  // -parcels, bookings and money collections for any station
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_PARCELS_REPORTS)
  @Get('/station/parcels/:stationId')
  findStationParcelsReports(@Param(':stationId') stationId: string) {
    return this.reportsService.findStationParcelsReports(stationId);
  }
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_BOOKINGS_REPORTS)
  @Get('/station/bookings/:stationId')
  findStationBookingsReports(@Param(':stationId') stationId: string) {
    return this.reportsService.findStationBookingsReports(stationId);
  }
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_COLLECTIONS_REPORTS)
  @Get('/station/money-collections/:stationId')
  findStationCollectionsReports(@Param(':stationId') stationId: string) {
    return this.reportsService.findStationCollectionsReports(stationId);
  }
}
