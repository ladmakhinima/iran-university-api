import {UserRegisterType, UserRole} from "../user.entity";
import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength} from "class-validator";

export class RegisterUserDTO {
    @IsNotEmpty({message: "نام و نام خانوادگی خود را وارد کنید"})
    @IsString({message: "نام و نام خانوادگی باید رشته باشد"})
    @MinLength(6, {message: "نام و نام خانوادگی باید حداقل 6 حرف داشته باشد"})
    fullName: string;

    @IsNotEmpty({message: "نفش کاربر را وارد کنید"})
    @IsEnum(UserRole, {message: "نفش کاربر را درست انتخاب کنید"})
    role: UserRole;

    @IsNotEmpty({message: "شماره تماس را وارد کنید"})
    @IsString({message: "شماره تماس باید رشته باشد"})
    @IsPhoneNumber("IR", {message: "شماره تماس فرمت درستی ندارد"})
    phone: string;

    @IsNotEmpty({message: "کدملی خود را وارد کنید"})
    @IsString({message: "کد ملی باید رشته باشد"})
    @MinLength(11, {message: 'کد ملی فرمت درستی ندارد'})
    nationalCode: string;

    @IsNotEmpty({message: "آدرس ایمیل خود را وارد کنید"})
    @IsString({message: "آدرس ایمیل باید درقالب رشته باشد"})
    @IsEmail({}, {message: "آدرس ایمیل فرمت درستی ندارد"})
    email: string;

    @IsNotEmpty({message: "نوع ثبت نام کاربر را وارد کنید"})
    @IsEnum(UserRegisterType, {message: "نوع ثبت نام کاربر نادرست میباشد"})
    registerType: UserRegisterType;

    @IsOptional()
    @IsString({message: "رمز عبور باید رشته باشد"})
    @MinLength(8, {message: "رمز عبور باید حداقل 8 حرف باشد"})
    password?: string;
}