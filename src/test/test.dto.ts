import {
    IsString,
    ValidateNested,
    IsNumber,
    IsOptional,
  } from 'class-validator';
import { Type } from 'class-transformer';
import { TestModel } from '../models/test.model';
import { OperatorModel } from '../models/operator.model';
import { instrumentalistModel } from '../models/instrumentalist.model';
import { TestSourceModel } from '../models/testSource.model';

export class TestDataDTO {
    
    @IsOptional()
    @ValidateNested()
    @Type(() => TestModel)
    readonly test?: TestModel

    @IsOptional()
    @ValidateNested()
    @Type(() => OperatorModel)
    readonly operator?: OperatorModel

    @IsOptional()
    @ValidateNested()
    @Type(() => instrumentalistModel)
    readonly instrumentalist?: instrumentalistModel

    @IsOptional()
    @ValidateNested()
    @Type(() => TestSourceModel)
    readonly testSorurces?: TestSourceModel[]
}
