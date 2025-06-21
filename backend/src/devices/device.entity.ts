import { User } from 'src/users/user.entity';
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm'

@Entity()
export class Device {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    deviceId: string;

    @Column({nullable: true})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.devices, { eager: true })
    owner: User;
}