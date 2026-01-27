import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import 'dotenv/config';
import { AppService } from 'src/app.service';

interface PingPayload {
  msg: string;
}

@WebSocketGateway({
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT}`, // Ui url
    credentials: true,
  },
  namespace: '/testsocket', // For Example: client needs to connect http://localhost:3000/testsocket
})
export class EventsGateway {
  constructor(private readonly appService: AppService) {}

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
    client.emit('server:pong', {
      recieved: body,
      number: this.appService.getNumbers(),
      at: Date.now(),
    });
  }
}
