import { ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { sensorModel } from './sensor.model';
import { dataSourceModel } from './dataSource.model';

export class TestSourceModel {
  @IsNumber()
  @IsOptional()
  id?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => sensorModel)
  readonly sensor?: sensorModel;

  @IsOptional()
  @ValidateNested()
  @Type(() => dataSourceModel)
  readonly datasource?: dataSourceModel;
}
