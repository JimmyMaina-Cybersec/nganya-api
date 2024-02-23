import { IsString } from 'class-validator';

export default class AssignUserToStationDto {
  @IsString()
  station: string;
  @IsString()
  userId: string;
}
