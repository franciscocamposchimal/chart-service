import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TestService } from './test.service';
import { TestModel } from '../models/test.model';

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
    public async createTest(@Res() res, @Body() body: TestModel){
        const newTest = await this.testService.createTest(body);
        return res.status(HttpStatus.OK).json(newTest);
    }

    @Put('/:id')
    public async updateTest(@Res() res, @Param() {id} ,@Body() body: TestModel){
        const updateTest = await this.testService.updateTest(id, body);
        return res.status(HttpStatus.OK).json(updateTest);
    }

    @Delete('/:id')
    public async deleteTest(@Res() res, @Param() {id}){
        const deleteConfirm = await this.testService.deleteTest(id);
        return res.status(HttpStatus.OK).json(deleteConfirm);
    }
}
