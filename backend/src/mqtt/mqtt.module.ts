import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { DevicesModule } from 'src/devices/devices.module';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({

  imports: [DevicesModule, WebsocketModule],
  providers: [MqttService]
})
export class MqttModule {}
