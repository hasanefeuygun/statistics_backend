import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import 'dotenv/config';

interface PingPayload {
  msg: string;
}

@WebSocketGateway({
  cors: {
    origin: true, // Ui url
    credentials: true,
  },
  namespace: '/realtime', // For Example: client needs to connect http://localhost:3000/realtime
})
export class EventsGateway {
  // İt's similar to controller but this is for socket events
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log('connected:', client.id);
    client.emit('server:hello', { msg: 'connected' });
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected:', client.id);
  }

  @SubscribeMessage('client:ping')
  onPing(@MessageBody() body: PingPayload, @ConnectedSocket() client: Socket) {
    client.emit('server:pong', { recieved: body, at: Date.now() });
  }
}
