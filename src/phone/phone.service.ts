import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PhoneAccessStatus, PhoneEntity} from "./phone.entity";
import {In, Not} from "typeorm";
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

    async getClientPhones(accessStatus: PhoneAccessStatus, segmentsIds: number[], flow: number) {
        if ([PhoneAccessStatus.PRIVATE, PhoneAccessStatus.PUBLIC].includes(accessStatus)) {
            throw new BadRequestException("سطح دسترسی نادرست میباشد");
        }
        if (segmentsIds && flow) {
            throw new BadRequestException("پارامتر های مسیر و بخش هردو همزمان نمیتوان پر کرد")
        }
        const flowCondition: object = {};
        if (flow) flowCondition.id = flow;
        if (segmentsIds) flowCondition.segments = {id: In(segmentsIds)};
        return PhoneEntity.find({
            where: {
                accessStatus,
                flow: flowCondition
            }
        })
    }

    private _findDuplicatedTitle(title: string, id?: number) {
        const where = id ? {id: Not(id), title} : {title};
        return PhoneEntity.count({where});
    }
}
