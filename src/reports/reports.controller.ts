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

  // agent (READ_AGENT_REPORTS)
  // -percels, bookings and money collections of the agent
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

  // manager(READ_AGENTS_REPORTS)
  // -percels, bookings and money collections of the agent
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

  // administrator and gen admin (READ_MANAGERS_REPORTS)
  // -percels, bookings and money collections of the agent
  @SetMetadata('permisions', UserPermissions.READ_STATIONS_PARCELS_REPORTS)
  @Get('/station/parcels/:stationId')
  findStationParcelsReports(
    @CurrentUser() admin: JwtPayload,
    @Param(':stationId') stationId: string,
  ) {
    return this.reportsService.findStationParcelsReports(admin, stationId);
  }
  @SetMetadata('permisions', UserPermissions.READ_STATIONS_BOOKINGS_REPORTS)
  @Get('/station/bookings/:stationId')
  findStationBookingsReports(
    @CurrentUser() admin: JwtPayload,
    @Param(':stationId') stationId: string,
  ) {
    return this.reportsService.findStationBookingsReports(admin, stationId);
  }
  @SetMetadata('permisions', UserPermissions.READ_STATIONS_COLLECTIONS_REPORTS)
  @Get('/station/money-collections/:stationId')
  findStationCollectionsReports(
    @CurrentUser() admin: JwtPayload,
    @Param(':stationId') stationId: string,
  ) {
    return this.reportsService.findStationCollectionsReports(admin, stationId);
  }
}
