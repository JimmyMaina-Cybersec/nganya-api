import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  plateNo: string;

  @IsString()
  color: string;

  @IsString()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  year: number;

  @IsNotEmpty()
  owner: string | Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  type: 'bus' | 'mini bus' | 'taxi' | 'truck' | 'van' | 'other' | 'car';

  @IsArray()
  @IsNotEmpty()
  seatLayout: Array<Array<string>>;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsString()
  @IsNotEmpty()
  status:
    | 'unassigned'
    | 'in station'
    | 'out of service'
    | 'in maintenance'
    | 'deleted'
    | 'in route';

  @IsString()
  imageURL?: string;
}
