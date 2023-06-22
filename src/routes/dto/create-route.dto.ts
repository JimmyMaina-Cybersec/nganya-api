import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsArray()
  destinations: string[];

  @IsArray()
  prices: { destination: string; price: number }[];

  @IsArray()
  documentPrices: { destination: string; price: number }[];

  @IsArray()
  parcelPrices: { destination: string; price: number }[];
}