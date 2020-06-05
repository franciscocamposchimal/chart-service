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

let DATA_CLIENT = '';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

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
  handleData(client: Socket, payload: any): void {
    // this.logger.log(payload);
    this.server.emit('SENSORS_DATA', payload);
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
}
