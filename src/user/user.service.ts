import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {ChangeUserStatusDTO, EditUserDTO, RegisterUserDTO} from './dtos';
import {UserEntity, UserRegisterType, UserStatus} from './user.entity';
import * as bcrypt from 'bcryptjs';
import {Not} from "typeorm";

@Injectable()
export class UserService {
    async registerUser(dto: RegisterUserDTO) {
        const duplicatedUser = await this._findUserDuplicated(dto.phone, dto.email, dto.nationalCode);
        if (duplicatedUser) {
            throw new ConflictException('کاربری از قبل با این اطلاعات ثبت شده است');
        }
        const user = new UserEntity();
        user.fullName = dto.fullName;
        user.password = await this._hashPassword(dto.password);
        user.registerType = UserRegisterType.SYSTEM;
        user.role = dto.role;
        user.phone = dto.phone;
        user.email = dto.email;
        user.nationalCode = dto.nationalCode;
        user.role = dto.role;
        if (dto.registerType === UserRegisterType.SYSTEM) {
            user.emailVerifyCode = Math.floor(Math.random() * 1000000).toString();
        } else {
            user.status = UserStatus.APPROVE;
        }
        return user.save();
    }

    async findUserByFullName(fullName: string) {
        const user = await UserEntity.findOneBy({fullName});
        if (!user) {
            throw new NotFoundException("کاربری با این نام و نام خانوادگی یافت نشد");
        }
        return user;
    }

    async editUser(id: number, dto: EditUserDTO) {
        const user = await UserEntity.findOneBy({id});
        if (!user) {
            throw new NotFoundException("کابری  با این سریال یافت نشد");
        }
        const duplicatedUser = await this._findUserDuplicatedBasedOnId(id, dto.phone, dto.email, dto.nationalCode);
        if (duplicatedUser) {
            throw new ConflictException('کاربری از قبل با این اطلاعات ثبت شده است');
        }
        if (dto.password) {
            dto.password = await this._hashPassword(dto.password);
        }
        const updatedResult = await UserEntity.update({id}, dto);
        return {isSuccess: updatedResult.affected > 0};
    }

    async changeUserStatusById(id: number, dto: ChangeUserStatusDTO) {
        const user = await UserEntity.findOneBy({id});
        if (!user) {
            throw new NotFoundException("کاربری با این سریال یافت نشد");
        }
        user.status = dto.status;
        user.approvedAt = new Date();
        await user.save();
        return {isSuccess: true}
    }

    _findUserDuplicated(phone: string, email: string, nationalCode?: string) {
        const where: object[] = [{phone}, {email}];
        if (nationalCode) where.push({nationalCode})
        return UserEntity.count({where});
    }

    _findUserDuplicatedBasedOnId(id: number, phone: string, email: string, nationalCode?: string) {
        const where: object[] = [{phone, id: Not(id)}, {email, id: Not(id)}];
        if (nationalCode) where.push({nationalCode, id: Not(id)})
        return UserEntity.count({where});
    }

    _hashPassword(password: string) {
        return bcrypt.hash(password, 8);
    }
}
