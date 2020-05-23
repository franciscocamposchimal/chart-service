
import {
    IsString,
    ValidateNested,
    IsNumber,
    IsOptional,
  } from 'class-validator';
import { Type } from 'class-transformer';

export class TestDataDTO {
    
    @ValidateNested()
    @Type(() => TestsDTO)
    readonly test?: TestsDTO

    @ValidateNested()
    @Type(() => OperatorDTO)
    readonly operator?: OperatorDTO

    @ValidateNested()
    @Type(() => instrumentalistDTO)
    readonly instrumentalist?: instrumentalistDTO

    @ValidateNested()
    @Type(() => TestSourceDTO)
    readonly testSorurces?: TestSourceDTO[]
}

class TestsDTO {
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

class OperatorDTO {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    name?: string

    @IsOptional()
    @ValidateNested()
    @Type(() => TestsDTO)
    tests?: TestsDTO[]
}

class instrumentalistDTO {
    @IsNumber()
    @IsOptional()
    id?: number
}

class TestSourceDTO {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsOptional()
    @ValidateNested()
    @Type(() => sensorDTO)
    readonly sensor?: sensorDTO

    @IsOptional()
    @ValidateNested()
    @Type(() => dataSourceDTO)
    readonly datasource?: dataSourceDTO
}

class sensorDTO {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    tag?: string
}

class dataSourceDTO {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    data?: string
}
