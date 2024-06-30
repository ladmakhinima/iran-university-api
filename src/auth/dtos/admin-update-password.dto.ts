import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class AdminUpdatePasswordDTO {
    @IsNotEmpty({message: "نام کاربری خود را وارد کنید"})
    @IsString({message: "نام کاربری باید رشته باشد"})
    username: string;

    @IsNotEmpty({message: 'رمز عبور را وارد کنید'})
    @IsString({message: "رمز عبور باید رشته باشد"})
    @MinLength(8, {message: "رمز عبور باید حداقل 8 حرف باشد"})
    password: string;

    @IsNotEmpty({message: 'رمز عبور جدید را وارد کنید'})
    @IsString({message: "رمز عبور جدید باید رشته باشد"})
    @MinLength(8, {message: "رمز عبور جدید باید حداقل 8 حرف باشد"})
    newPassword: string;
}