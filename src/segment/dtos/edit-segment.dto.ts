import {IsNotEmpty, IsString} from "class-validator";

export class EditSegmentDTO {
    @IsNotEmpty({message: 'عنوان بخش را وارد کنید'})
    @IsString({message: "عنوان بخش باید رشته باشد"})
    label: string;
}