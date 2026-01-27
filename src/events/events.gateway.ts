import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import 'dotenv/config';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT}`, // Allow this channel
  },
})
export class EventsGateway {
  // It's similar to controller but this is for socket events
  @WebSocketServer()
  server: Server;

  @OnEvent('numbers.tick')
  handleNumbersTick(payload: { value: number; at: number }) {
    this.server.emit('server:stats', payload);
  }
}
