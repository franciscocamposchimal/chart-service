import { IsString, IsNumber, IsOptional } from 'class-validator';

export class sensorModel {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
