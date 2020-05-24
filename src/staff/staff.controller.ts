import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { OperatorModel } from '../models/operator.model';
import { instrumentalistModel } from '../models/instrumentalist.model';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // Operator
  @Get('/operators')
  public async getAllOperator(@Res() res) {
    const operator = await this.staffService.getAllOperators();
    return res.status(HttpStatus.OK).json(operator);
  }

  @Get('/operators/:id')
  public async getOneOp(@Res() res, @Param() { id }) {
    const operator = await this.staffService.getOneOperator(id);
    return res.status(HttpStatus.OK).json(operator);
  }

  @Post('/operators')
  public async createOp(@Res() res, @Body() body: OperatorModel) {
    const newOp = await this.staffService.createOperator(body);
    return res.status(HttpStatus.OK).json(newOp);
  }

  @Put('/operators/:id')
  public async updateOperator(@Res() res, @Param() { id }, @Body() { name }) {
    const updateOp = await this.staffService.updateOperator(id, name);
    return res.status(HttpStatus.OK).json(updateOp);
  }

  @Delete('/operators/:id')
  public async deleteOp(@Res() res, @Param() { id }) {
    const deleteConfirm = await this.staffService.deleteOperator(id);
    return res.status(HttpStatus.OK).json(deleteConfirm);
  }
  // Intrumentalist
  @Get('/instrumentalist')
  public async getAllInst(@Res() res) {
    const instrumentalists = await this.staffService.getAllInstrumentalist();
    return res.status(HttpStatus.OK).json(instrumentalists);
  }

  @Get('/instrumentalist/:id')
  public async getOneInst(@Res() res, @Param() { id }) {
    const instrumentalist = await this.staffService.getOneInstrumentalist(id);
    return res.status(HttpStatus.OK).json(instrumentalist);
  }

  @Post('/instrumentalist')
  public async createInst(@Res() res, @Body() body: instrumentalistModel) {
    const newInst = await this.staffService.createInstrumentalist(body);
    return res.status(HttpStatus.OK).json(newInst);
  }

  @Put('/instrumentalist/:id')
  public async updateInst(@Res() res, @Param() { id }, @Body() { name }) {
    const updateInst = await this.staffService.updateInstrumentalist(id, name);
    return res.status(HttpStatus.OK).json(updateInst);
  }

  @Delete('/instrumentalist/:id')
  public async deleteInst(@Res() res, @Param() { id }) {
    const deleteConfirm = await this.staffService.deleteInstrumentalist(id);
    return res.status(HttpStatus.OK).json(deleteConfirm);
  }
}
