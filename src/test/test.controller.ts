import { Controller, Get, Res, HttpStatus, Param, Post, Body } from '@nestjs/common';
import { TestService } from './test.service';
import { TestDataDTO } from './test.dto';

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService
    ){}

    @Get()
    public async getAllTest(@Res() res){
        const tests = await this.testService.getAllTest();
        return res.status(HttpStatus.OK).json(tests);
    }

    @Get('/:id')
    public async getOneTest(@Res() res, @Param() {id}){
        const test = await this.testService.getOneTest(id);
        return res.status(HttpStatus.OK).json(test);
    }

    @Post()
    public async createTest(@Res() res, @Body() body: TestDataDTO){
        const newTest = await this.testService.createTest(body);
        return res.status(HttpStatus.OK).json(newTest);
    }
}
