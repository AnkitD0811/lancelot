import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateDeviceDto } from './dto/create-device.dto';

@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {

    constructor(
        private devicesService: DevicesService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async registerDevice(@Body() createDeviceDto : CreateDeviceDto, @Request() req) {
        return this.devicesService.createDevice(createDeviceDto, req.user);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getMyDevices(@Request() req) {
        return this.devicesService.findByUser(req.user);
    }
}
