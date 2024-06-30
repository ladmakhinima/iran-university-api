import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class LoginDTO {
    @IsNotEmpty({message: "آدرس ایمیل خود را وارد کنید"})
    @IsString({message: "آدرس ایمیل باید درقالب رشته باشد"})
    @IsEmail({}, {message: "آدرس ایمیل فرمت درستی ندارد"})
    email: string;

    @IsNotEmpty({message: 'رمز عبور را وارد کنید'})
    @IsString({message: "رمز عبور باید رشته باشد"})
    @MinLength(8, {message: "رمز عبور باید حداقل 8 حرف باشد"})
    password?: string;
}