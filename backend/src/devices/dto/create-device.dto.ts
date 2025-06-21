import { IsString, Length } from "class-validator";

export class CreateDeviceDto {

    @IsString()
    @Length(3, 64)
    deviceId: string;

    @IsString()
    @Length(1, 128)
    name: string;
}