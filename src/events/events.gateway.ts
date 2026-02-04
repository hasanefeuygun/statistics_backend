import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import 'dotenv/config';
import { OnEvent } from '@nestjs/event-emitter';
import { NumbersService } from '../numbers/numbers.service';
import { Logger, UseFilters } from '@nestjs/common';

import { Events } from '../constants/events';

import { WsExceptionsFilter } from '../ws-exception-filter';
import { determineUrl, EnvShape } from 'src/config/cors.policy';

const url = determineUrl(process.env as EnvShape);

@WebSocketGateway({
  cors: {
    origin: url,
  },
})
export class EventsGateway {
  // It's similar to controller but this is for socket events
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');

  constructor(private readonly numbersService: NumbersService) {}

  afterInit() {
    this.logger.log(`Gateway initilaized and cors origin is: ${url}`);
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} connected`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.numbersService.stopForClient();
    this.logger.log(
      `Client ${client.id} disconnected and data flow stopped!Subscriber count:${this.numbersService.getSubscriberCount()}`,
    );
  }

  @UseFilters(WsExceptionsFilter)
  @SubscribeMessage('subscribe')
  handleSubscribe(@ConnectedSocket() client: Socket) {
    this.numbersService.startForClient();

    this.logger.log(
      `Data flow started for client ${client.id}.Subscriber count:${this.numbersService.getSubscriberCount()}`,
    );

    client.emit(Events.SERVER_SUBSCRIPTION, {
      isSubscribed: true,
      subscriberCount: this.numbersService.getSubscriberCount(),
    });
  }

  @UseFilters(WsExceptionsFilter)
  @SubscribeMessage('unsubscribe')
  handleUnSubscribe(@ConnectedSocket() client: Socket) {
    this.numbersService.stopForClient();

    this.logger.log(
      `Data flow stopped by emitting for client ${client.id}.Subscriber count:${this.numbersService.getSubscriberCount()} `,
    );

    client.emit(Events.SERVER_SUBSCRIPTION, {
      isSubscribed: false,
      subscriberCount: this.numbersService.getSubscriberCount(),
    });
  }

  @OnEvent('numbers.tick') // Listening numbers.tick event from numbers.service
  handleNumbersTick(payload: { value: number; at: number }) {
    this.server.emit(Events.SERVER_STATS, payload);
  }
}
