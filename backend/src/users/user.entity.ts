import { Device } from "src/devices/device.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique : true })
    email: string;
    
    @Column()
    password: string;

    @OneToMany(() => Device, (device) => device.owner)
    devices: Device[];
}