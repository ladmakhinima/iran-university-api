import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {RegisterUserDTO} from "../user/dtos";
import {LoginDTO} from "./dtos";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    @Inject(UserService)
    private readonly userService: UserService;

    clientSignup(dto: RegisterUserDTO) {
        return this.userService.registerUser(dto);
    }

    async clientLogin(dto: LoginDTO) {
        const user = await this.userService.findUserByEmail(dto.email);
        const passwordIsOk = await bcrypt.compare(dto.password, user.password);
        if (!passwordIsOk) {
            throw new NotFoundException("کاربری با این آدرس ایمیل یافت نشد");
        }
        return user;
    }
}
