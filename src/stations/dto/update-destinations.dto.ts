import { IsArray } from "class-validator";

export class UpdateStationsDestinationsDTO {
    @IsArray()
    destinations: string
}