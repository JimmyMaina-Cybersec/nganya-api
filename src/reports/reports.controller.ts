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
  @Get('/agent-report/parcels/:day')
  findAgentParcelReport(
    @CurrentUser() agent: JwtPayload,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findAgentParcelReport(agent, day);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENT_BOOKINGS_REPORT)
  @Get('/agent-report/bookings/:day')
  findAgentBookingsReport(
    @CurrentUser() agent: JwtPayload,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findAgentBookingsReport(agent, day);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENT_COLLECTIONS_REPORT)
  @Get('/agent-report/money-collections/:day')
  findAgentCollectionsReport(
    @CurrentUser() agent: JwtPayload,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findAgentCollectionsReport(agent, day);
  }

  // manager(READ_AGENTS_REPORTS)
  // -percels, bookings and money collections of the agent
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_PARCELS_REPORTS)
  @Get('/manager-report/parcels/:day')
  findManagerParcelReport(
    @CurrentUser() manager: JwtPayload,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findManagerParcelReport(manager, day);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_BOOKINGS_REPORTS)
  @Get('/manager-report/bookings/:day')
  findManagerBookingsReport(
    @CurrentUser() manager: JwtPayload,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findManagerBookingsReport(manager, day);
  }
  @SetMetadata('permissions', UserPermissions.READ_AGENTS_COLLECTIONS_REPORTS)
  @Get('/manager-report/money-collections/:day')
  findManagerCollectionsReport(
    @CurrentUser() manager: JwtPayload,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findManagerCollectionsReport(manager, day);
  }

  // administrator and gen admin (READ_MANAGERS_REPORTS)
  // -percels, bookings and money collections of the agent
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_PARCELS_REPORTS)
  @Get('/station/parcels/:stationId/:day')
  findStationParcelsReports(
    @Param(':stationId') stationId: string,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findStationParcelsReports(stationId, day);
  }
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_BOOKINGS_REPORTS)
  @Get('/station/bookings/:stationId/:day')
  findStationBookingsReports(
    @Param(':stationId') stationId: string,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findStationBookingsReports(stationId, day);
  }
  @SetMetadata('permissions', UserPermissions.READ_STATIONS_COLLECTIONS_REPORTS)
  @Get('/station/money-collections/:stationId/:day')
  findStationCollectionsReports(
    @Param(':stationId') stationId: string,
    @Param('day') day: string = new Date().toISOString(),
  ) {
    return this.reportsService.findStationCollectionsReports(stationId, day);
  }
}
