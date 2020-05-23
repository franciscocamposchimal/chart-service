import {
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TestModel } from './test.model';

export class OperatorModel {
  @IsNumber()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TestModel)
  tests?: TestModel[];
}
