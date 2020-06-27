import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { TestService } from 'test/test.service';
import { SensorService } from 'sensor/sensor.service';

let DATA_CLIENT = '';

@WebSocketGateway({
  origins: '*:*',
  pingTimeout: 60000,
  transports: ['websocket', 'polling'],
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly testService: TestService,
    private readonly sensorService: SensorService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    if (DATA_CLIENT != client.id && DATA_CLIENT != '') {
      this.server.emit('SENSORS_ISCONNECTED', {
        client: DATA_CLIENT,
        isConnected: true,
      });
    }
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    if (DATA_CLIENT == client.id) {
      this.logger.log('SENSORS_ISCONNECTED');
      this.server.emit('SENSORS_ISCONNECTED', {
        client: DATA_CLIENT,
        isConnected: false,
      });
      DATA_CLIENT = '';
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('SERVER_SOCK')
  async handleData(client: Socket, payload: any) {
    // this.logger.log(payload);
    const { date, sensorsP, sensorsT } = payload;
    payload.sensorsPa = this.sensorService.dataConvert('Pa', JSON.parse(JSON.stringify(sensorsP)));
    payload.sensorsMPa = this.sensorService.dataConvert('MPa', JSON.parse(JSON.stringify(sensorsP)));
    payload.sensorsF = this.sensorService.dataConvert('F', JSON.parse(JSON.stringify(sensorsT)));
    // console.log(payload);
    this.server.emit('SENSORS_DATA', payload);
    const testInProgress: any = await this.testService.getTestInProgress();
    // console.log(testInProgress);
    if (testInProgress.id) {
      const { testSources } = testInProgress;
      let sensorDataToExcel = [];
      // console.log(testSources);
      testSources.forEach(
        async ({ sensor: { tag, type }, datasource: { data } }) => {
          // console.log(`SENSOR.. tag:${tag} type:${type} id:${data}`);
          if (type === 'T') {
            const getSensorT = sensorsT.find((s: any) => s.name === tag);
            sensorDataToExcel.push(getSensorT);
            await this.testService.updateDataSource(data, getSensorT.val);
            // console.log('getSensorT ', updateTArray);
          } else {
            const getSensorP = sensorsP.find((s: any) => s.name === tag);
            sensorDataToExcel.push(getSensorP);
            await this.testService.updateDataSource(data, getSensorP.val);
            // console.log('getSensorP ', updatePArray);
          }
        },
      );

      this.testService.updatePrintData(testInProgress.name, {
        date,
        sensors: sensorDataToExcel,
      });
      sensorDataToExcel = [];
    }
  }

  @SubscribeMessage('SENSORS_CONNECTION')
  handleSensorsConnnection(client: Socket, isConnected: boolean): void {
    DATA_CLIENT = client.id;
    // this.logger.log('SENSORS_CONNECTION');
    // this.logger.log(DATA_CLIENT);
    this.server.emit('SENSORS_ISCONNECTED', {
      client: DATA_CLIENT,
      isConnected,
    });
  }

  /* private convertToArray(data: any) {
    return data
      .trim()
      .substr(1, data.length - 2)
      .split(',')
      .map((e: any) => e.trim())
      .filter((e: any) => e !== '');
  } */
}
