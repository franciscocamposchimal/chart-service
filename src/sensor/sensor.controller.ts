import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Param, Body } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { sensorModel } from '../models/sensor.model';

@Controller('sensor')
export class SensorController {
    constructor(private readonly sensorService: SensorService) {}

    @Get()
    public async getAllSens(@Res() res) {
      const sensors = await this.sensorService.getAllSensors();
      return res.status(HttpStatus.OK).json(sensors);
    }
  
    @Get('/:id')
    public async getOneSens(@Res() res, @Param() { id }) {
      const sensor = await this.sensorService.getOneSensor(id);
      return res.status(HttpStatus.OK).json(sensor);
    }
  
    @Post()
    public async createSens(@Res() res, @Body() body: sensorModel) {
      const newSens = await this.sensorService.createSensor(body);
      return res.status(HttpStatus.OK).json(newSens);
    }
  
    @Put('/:id')
    public async updateSens(@Res() res, @Param() { id }, @Body() body: sensorModel) {
      const updateSens = await this.sensorService.updateSensor(id, body);
      return res.status(HttpStatus.OK).json(updateSens);
    }
  
    @Delete('/:id')
    public async deleteSens(@Res() res, @Param() { id }) {
      const deleteConfirm = await this.sensorService.deleteSensor(id);
      return res.status(HttpStatus.OK).json(deleteConfirm);
    }
}
