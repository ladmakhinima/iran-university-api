import {Body, Controller, Inject, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDTO} from "./dtos";
import {RegisterUserDTO} from "../user/dtos";

@Controller('auth')
export class AuthController {
    @Inject(AuthService) private readonly authService: AuthService;

    @Post("client/login")
    clientLogin(@Body() dto: LoginDTO) {
        return this.authService.clientLogin(dto);
    }

    @Post("client/signup")
    clientSignup(@Body() dto: RegisterUserDTO) {
        return this.authService.clientSignup(dto);
    }
}
