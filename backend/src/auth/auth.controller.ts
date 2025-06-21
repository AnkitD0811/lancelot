import { Controller, Post, UseGuards, Request, HttpCode, HttpStatus, Body, Get, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() signInDto: SignInDto) {
        const user = await this.usersService.createUser(signInDto.email, signInDto.password);
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

