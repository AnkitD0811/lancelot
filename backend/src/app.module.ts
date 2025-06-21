import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './devices/devices.module';
import { MqttModule } from './mqtt/mqtt.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [ 
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevicesModule,
    MqttModule,
    WebsocketModule ],
  controllers: [AppController],
  providers: [AppService, UsersService, WebsocketGateway],
})
export class AppModule {}
