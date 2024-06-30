import {UserStatus} from "../user.entity";
import {IsEnum, IsNotEmpty} from "class-validator";

export class ChangeUserStatusDTO {
    @IsNotEmpty({message: 'وضعیت کاربر باید پر شود'})
    @IsEnum(UserStatus, {message: 'وضعیت کاربر نادرست میباشد'})
    status: UserStatus;
}