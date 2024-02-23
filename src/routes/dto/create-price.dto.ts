import { IsArray, IsEmpty, IsString } from "class-validator";

export default class CreatePriceDto {
    @IsArray()
    prices: { destination: string; category: string; price: number, currency: string }[];

    @IsString()
    mode: "parcel" | "fare";
}