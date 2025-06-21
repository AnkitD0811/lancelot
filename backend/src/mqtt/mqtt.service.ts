import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { DevicesService } from 'src/devices/devices.service';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class MqttService implements OnModuleInit {

    private client: mqtt.MqttClient;
    private readonly logger = new Logger(MqttService.name);

    constructor(
        private devicesService: DevicesService,
        private configService: ConfigService,
        private websocketGateway: WebsocketGateway
    ) {}

    onModuleInit() {
        const host = this.configService.get('MQTT_HOST');
        const port = this.configService.get('MQTT_PORT');

        const clientId = `nest_mqtt_${Math.random().toString(16).slice(3)}`;
        const connectUrl = `mqtt://${host}:${port}`;

        this.client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
        });

        this.client.on('connect', () => {
        this.logger.log('Connected to MQTT broker');
        this.client.subscribe('esp32/+/data');
        });

        this.client.on('error', (err) => {
        this.logger.error('MQTT Connection error', err);
        });

        this.client.on('message', async (topic: string, payload: Buffer) => {
            const message = payload.toString();
            this.logger.log(`MQTT message received`);
            this.logger.log(`Topic: ${topic}`);
            this.logger.log(`Payload: ${message}`);

            // Extract deviceId from topic: esp32/<deviceId>/data
            const match = topic.match(/^esp32\/(\w+)\/data$/);
            if (!match) {
                console.warn('Invalid topic format');
                return;
            }

            const deviceId = match[1];
            try {
                const device = await this.devicesService.findByDeviceId(deviceId);

                // Mock output
                console.log(`Device found: ${device.name} (Owner: ${device.owner.email})`);
                console.log(`Data: ${message}`);

                // TODO: Store to DB as well
                this.websocketGateway.emitToUser(device.owner.id, 'telemetry', {
                deviceId: device.deviceId,
                data: message,
                timestamp: new Date().toISOString(),
                });

            } catch (err) {
                console.error(`Device not found for ID ${deviceId}`);
            }
        });
    }
}
