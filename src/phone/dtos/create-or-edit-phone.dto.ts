import {PhoneAccessStatus} from "../phone.entity";
import {IsEnum, IsNotEmpty, IsPhoneNumber, IsString, MinLength} from "class-validator";

export class CreateOrEditPhoneDTO {
    @IsNotEmpty({message: "عنوان شماره تماس را وارد کنید"})
    @IsString({message: "عنوان باید رشته باشد"})
    @MinLength(4, {message: "عنوان باید حداقل 4 حرف داشته باشد"})
    title: string;

    @IsNotEmpty({message: "شماره تماس را وارد کنید"})
    @IsPhoneNumber("IR", {message: "شماره تماس فرمت درستی ندارد"})
    phone: string;

    @IsNotEmpty({message: "شماره داخلی را وارد کنید"})
    internalPhone: string;

    @IsNotEmpty({message: "نام مسئول را وارد کنید"})
    @MinLength(4, {message: "عنوان باید حداقل 4 حرف داشته باشد"})
    responsibleName: string;

    @IsNotEmpty({message: "شماره تلفن مسئول را وارد کنید"})
    responsiblePhone: string;

    @IsNotEmpty({message: "سطح  دسسترسی شماره تلفن را وارد کنید"})
    @IsEnum(PhoneAccessStatus, {message: "سطح دسترسی شماره تلفن نادرست میباشد"})
    accessStatus: PhoneAccessStatus;

    @IsNotEmpty({message: "عنوان شماره تماس را وارد کنید"})
    id?: number;

    @IsNotEmpty({message: "مسیر مربوط به این شماره تلفن را وارد کنید"})
    flow: number;
}
