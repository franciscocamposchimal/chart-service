import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OperatorModel } from './operator.model';
import { instrumentalistModel } from './instrumentalist.model';
import { TestSourceModel } from './testSource.model';

export class TestModel {
  @IsNumber()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  dateInit?: string;

  @IsString()
  @IsOptional()
  dateEnd?: string;

  @IsBoolean()
  @IsOptional()
  isEnd?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => OperatorModel)
  readonly operator?: OperatorModel;

  @IsOptional()
  @ValidateNested()
  @Type(() => instrumentalistModel)
  readonly instrumentalist?: instrumentalistModel;

  @IsOptional()
  @ValidateNested()
  @Type(() => TestSourceModel)
  readonly testSorurces?: TestSourceModel[];
}
