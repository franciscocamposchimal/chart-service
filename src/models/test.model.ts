import {
    IsString,
    IsNumber,
    IsOptional,
  } from 'class-validator';

export class TestModel {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    dateInit?: string

    @IsString()
    @IsOptional()
    dateEnd?: string
}