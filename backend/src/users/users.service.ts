import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

    // Tasks:
    // Create New User
    // Validate Existing User

    private users: User[] = [
        {
        id: "1",
        email: 'john@gmail.com',
        password: '$2b$10$zwvfgjaCwf5DH56rnArJeedj1TjHUU4DgKX9zkz7bvJVVRscHBipq',
        devices: []
        },
        {
        id: "2",
        email: 'maria@yahoo.com',
        password: '$2b$10$ESdQLNSFxGg01w9qMpLEWuS2qDaEhI5r27QqNtNdHxkZBPdUwwLWO',
        devices:[]
        },
    ];

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async createUser(email: string, password: string): Promise<User> {

        const user = await this.findByEmail(email)

        if(user) throw new BadRequestException('Email is Already Registered')
        else {
            const hash = await bcrypt.hash(password, 10)
            
            const newUser: User = {
                id: (this.users.length + 1).toString(),
                email: email,
                password: hash,
                devices: [],
            }

            this.users.push(newUser)

            return newUser
        }
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.findByEmail(email)
        if(!user) throw new BadRequestException("Email Address is Not Registered")

        if(user) {
            if(!await bcrypt.compare(pass, user.password)) {
                throw new BadRequestException("Incorrect Password")
            }
            const { password, ...result } = user
            return result
        }

        return null
    }

}
