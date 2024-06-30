import {Column, Entity} from "typeorm";
import {CoreEntity} from "../core/database/core.entity";

export enum UserRole {
    STUDENT = 'STUDENT',
    EMPLOYEE = 'EMPLOYEE',
    OTHER = 'OTHER',
}

export enum UserRegisterType {
    CLIENT = 'CLIENT',
    SYSTEM = 'SYSTEM'
}

export enum UserStatus {
    APPROVE = 'APPROVE',
    NOT_APPROVE = 'NOT_APPROVE',
    REJECT = 'REJECT'
}

@Entity({
    name: "_users"
})
export class UserEntity extends CoreEntity {
    @Column({name: 'full_name', type: 'varchar'})
    fullName: string;

    @Column({name: 'register_type', type: 'varchar'})
    registerType: UserRegisterType

    @Column({name: 'role', type: 'varchar'})
    role: UserRole;

    @Column({name: 'phone', type: 'varchar'})
    phone: string;

    @Column({name: 'national_code', type: 'varchar', nullable: true})
    nationalCode: string;

    @Column({name: 'email', type: 'varchar', nullable: true})
    email: string;

    @Column({name: 'password', type: 'varchar'})
    password: string;

    @Column({name: 'email_verify_code', type: 'varchar', nullable: true})
    emailVerifyCode: string;

    @Column({name: 'status', type: 'varchar', default: UserStatus.NOT_APPROVE})
    status: UserStatus

    @Column({name: 'approved_at', type: 'timestamptz', nullable: true})
    approvedAt: Date
}