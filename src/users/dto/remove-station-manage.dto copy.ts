import { IsString } from 'class-validator';

export default class RemoveUserFromStationDto {
  @IsString()
  userId: string;
}
