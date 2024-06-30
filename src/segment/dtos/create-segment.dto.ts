import {SegmentEntity} from "../segment.entity";
import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateSegmentDTO {
    @IsNotEmpty({message: 'عنوان بخش را وارد کنید'})
    @IsString({message: "عنوان بخش باید رشته باشد"})
    label: string;

    @IsOptional()
    @IsInt({message: "سریال بخش پدر نادرست میباشد"})
    parent?: number | SegmentEntity;
}