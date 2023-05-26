import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsArray()
  destinations: string[];

  @IsNotEmpty()
  prices: Map<string, number>;
}
