import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PhoneEntity} from "./phone.entity";
import {Not} from "typeorm";
import {FlowEntity} from "../flow/flow.entity";
import {CreateOrEditPhoneDTO} from "./dtos";


@Injectable()
export class PhoneService {
    async createOrEditPhone(dto: CreateOrEditPhoneDTO) {
        const duplicatedByTitle = await this._findDuplicatedTitle(dto.title, dto.id);
        if (duplicatedByTitle) {
            throw new ConflictException("عنوان شماره تماس قبلا ثبت شده است");
        }
        let phone = new PhoneEntity();
        if (dto.id) {
            phone = await PhoneEntity.findOneBy({id: dto.id});
            if (!phone) {
                throw new NotFoundException("شماره تماسی با این سریال یافت نشد");
            }
        }
        phone.flow = await FlowEntity.findOne({where: {id: dto.flow}});
        if (!phone.flow) {
            throw new NotFoundException("مسیری با این سریال یافت نشد")
        }
        phone.phone = dto.phone;
        phone.internalPhone = dto.internalPhone;
        phone.responsiblePhone = dto.responsiblePhone;
        phone.responsibleName = dto.responsibleName;
        phone.accessStatus = dto.accessStatus;
        return phone.save();
    }

    async getPhonesWithPage(page: number, limit: number) {
        const count = await PhoneEntity.count();
        const content = await PhoneEntity.find({take: limit, skip: limit * page});
        return {count, content};
    }

    private _findDuplicatedTitle(title: string, id?: number) {
        const where = id ? {id: Not(id), title} : {title};
        return PhoneEntity.count({where});
    }
}
