import {
    IsNumber,
    IsOptional,
  } from 'class-validator';

export class instrumentalistModel {
    @IsNumber()
    @IsOptional()
    id?: number
}