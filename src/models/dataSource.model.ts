import {
    IsString,
    IsNumber,
    IsOptional,
  } from 'class-validator';

export class dataSourceModel {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    data?: string
}