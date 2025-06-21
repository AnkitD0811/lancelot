import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebsocketGateway.name);

  private clients: Map<string, Set<Socket>> = new Map();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        socket.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('jwt.secret'),
      });

      const userId = payload.sub;
      socket.data.userId = userId;

      let sockets = this.clients.get(userId);
      if (!sockets) {
        sockets = new Set<Socket>();
        this.clients.set(userId, sockets);
      }

      sockets.add(socket);
      this.logger.log(`✅ User ${userId} connected`);
    } catch (err) {
      this.logger.warn('❌ Invalid or missing JWT token');
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    const userId = socket.data.userId;
    if (!userId) return;

    const sockets = this.clients.get(userId);
    if (!sockets) return;

    sockets.delete(socket);

    if (sockets.size === 0) {
      this.clients.delete(userId);
    }

    this.logger.log(`User ${userId} disconnected`);
  }

  emitToUser(userId: string, event: string, payload: any) {
    const sockets = this.clients.get(userId);
    if (!sockets) return;

    sockets.forEach((socket) => {
      socket.emit(event, payload);
    });
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket) {
    client.emit('pong');
  }
}
