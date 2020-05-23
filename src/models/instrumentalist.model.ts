import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TestModel } from './test.model';

export class instrumentalistModel {
  @IsNumber()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TestModel)
  readonly tests?: TestModel[];
}
