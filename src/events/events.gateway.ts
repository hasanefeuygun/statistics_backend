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

@WebSocketGateway({
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT}`, // Allow this channel
  },
})
export class EventsGateway {
  // It's similar to controller but this is for socket events
  @WebSocketServer()
  server: Server;

  constructor(private readonly numbersService: NumbersService) {}

  @SubscribeMessage('subscribe')
  handleSubscribe(@ConnectedSocket() client: Socket) {
    this.numbersService.startForClient();

    client.emit('server:subscribed', {
      ok: true,
      subscriberCount: this.numbersService.getSubscriberCount(),
    });
  }

  @SubscribeMessage('unsubscribe')
  handleUnSubscribe(@ConnectedSocket() client: Socket) {
    this.numbersService.stopForClient();

    client.emit('server:unsubscribed', {
      ok: false,
      subsciberCount: this.numbersService.getSubscriberCount(),
    });
  }

  @OnEvent('numbers.tick') // Listening numbers.tick event from numbers.service
  handleNumbersTick(payload: { value: number; at: number }) {
    this.server.emit('server:stats', payload);
  }
}
