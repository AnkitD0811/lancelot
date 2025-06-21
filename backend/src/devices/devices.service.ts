import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Device } from './device.entity';
import { User } from 'src/users/user.entity';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {

    private devices: Device[] = [];

    async createDevice(createDeviceDto: CreateDeviceDto, owner: User): Promise<Device> {

        const dev = this.devices.find(device => device.deviceId === createDeviceDto.deviceId);
        if(dev) throw new ConflictException("Device ID ALready Registered");

        const newDevice: Device = {

            id: (this.devices.length + 1).toString(),
            deviceId: createDeviceDto.deviceId,
            name: createDeviceDto.name,
            createdAt: new Date(),
            owner: owner,
        }

        this.devices.push(newDevice);

        return newDevice;
    }

    async findByUser(user: any): Promise<Device[]> {

        return this.devices.filter(device => device.owner.id === user.id);
    }

    async findByDeviceId(deviceId: string): Promise<Device> {

        const device = this.devices.find(d => d.deviceId === deviceId);
        if(!device) throw new NotFoundException("Device Not Found in Database");

        return device;
    }
}
