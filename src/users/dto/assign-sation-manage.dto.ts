import { IsString } from 'class-validator';

export default class AssignStationManageDto {
  @IsString()
  station: string;
  @IsString()
  userId: string;
}
