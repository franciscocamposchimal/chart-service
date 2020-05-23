import { IsString, IsNumber, IsOptional } from 'class-validator';

export class dataSourceModel {
  @IsNumber()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  data?: string;
}
