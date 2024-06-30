import {SegmentEntity} from "../../segment/segment.entity";
import {IsArray, IsInt, IsNotEmpty, IsOptional} from "class-validator";

export class CreateOrEditFlowDTO {
    @IsNotEmpty({message: "بخش های مربوط به این مسیر باید پر شوند"})
    @IsInt({each: true, message: "سریال بخش ها باید عددی باشند"})
    @IsArray({message: "سریال بخش ها باید لیستی از اعداد باشند"})
    segments: number[] | SegmentEntity[]


    @IsOptional()
    @IsInt({message: "سریال مسیر باید عددی باشد"})
    id?: number;
}