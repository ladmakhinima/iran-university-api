import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {RegisterUserDTO} from "../user/dtos";
import {AdminUpdatePasswordDTO, LoginDTO} from "./dtos";
import * as bcrypt from "bcryptjs";
import {AdminEntity} from "./admin.entity";

@Injectable()
export class AuthService {
    @Inject(UserService)
    private readonly userService: UserService;

    clientSignup(dto: RegisterUserDTO) {
        return this.userService.registerUser(dto);
    }

    async clientLogin(dto: LoginDTO) {
        const user = await this.userService.findUserByFullName(dto.username);
        const passwordIsOk = await bcrypt.compare(dto.password, user.password);
        if (!passwordIsOk) {
            throw new NotFoundException("کاربری با این نام و نام خانوادگی یافت نشد");
        }
        return user;
    }

    async adminLogin(dto: LoginDTO) {
        const admin = await AdminEntity.findOneBy({username: dto.username})
        if (!admin) {
            throw new NotFoundException("ادمینی با این نام کاربری یافت نشد")
        }
        const isPasswordOk = await bcrypt.hash(dto.password, admin.password);
        if (!isPasswordOk) {
            throw new NotFoundException("ادمینی با این نام کاربری یافت نشد")
        }
        return {success: true}
    }

    async adminUpdatePassword(dto: AdminUpdatePasswordDTO) {
        const {success} = await this.adminLogin(dto);
        if (!success) {
            throw new NotFoundException("ادمینی با این نام کاربری یافت نشد")
        }
        dto.newPassword = await bcrypt.hash(dto.newPassword, 8);
        const updatedResult = await AdminEntity.update({username: dto.username}, {password: dto.newPassword});
        return {isSuccess: updatedResult.affected > 0}
    }
}
