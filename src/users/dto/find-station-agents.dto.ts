import { IsString } from 'class-validator';

export class FindStationAgentsDto {
  @IsString()
  station: string;
}
