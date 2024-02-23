import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsArray()
  destinations: string[];
}
