import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsArray()
  destinations: string[];

  @IsArray()
  farePrices: { destination: string; category: string; price: number, currency: string }[];

  @IsArray()
  parcelPrices: { destination: string; category: string; price: number, currency: string }[];
}
