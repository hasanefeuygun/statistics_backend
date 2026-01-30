import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import 'dotenv/config';
import { OnEvent } from '@nestjs/event-emitter';
import { NumbersService } from 'src/numbers/numbers.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT}`, // Allow this channel
  },
})
export class EventsGateway {
  // It's similar to controller but this is for socket events
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');

  constructor(private readonly numbersService: NumbersService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.numbersService.stopForClient();
    this.logger.log(`Client ${client.id} disconnected and data flow stopped!`);
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(@ConnectedSocket() client: Socket) {
    this.numbersService.startForClient();

    this.logger.log(`Data flow started for client ${client.id}`);

    client.emit('server:subscribed', {
      isSubscribed: true,
      subscriberCount: this.numbersService.getSubscriberCount(),
    });
  }

  @SubscribeMessage('unsubscribe')
  handleUnSubscribe(@ConnectedSocket() client: Socket) {
    this.numbersService.stopForClient();

    this.logger.log(`Data flow stopped by emitting for client ${client.id}`);

    client.emit('server:unsubscribed', {
      isSubscribed: false,
      subsciberCount: this.numbersService.getSubscriberCount(),
    });
  }

  @OnEvent('numbers.tick') // Listening numbers.tick event from numbers.service
  handleNumbersTick(payload: { value: number; at: number }) {
    this.server.emit('server:stats', payload);
  }
}
