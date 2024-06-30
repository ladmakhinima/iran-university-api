import {BadRequestException, ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateOrEditFlowDTO} from "./dtos";
import {SegmentEntity} from "../segment/segment.entity";
import {DataSource, In, Not} from "typeorm";
import {FlowEntity} from "./flow.entity";

@Injectable()
export class FlowService {
    @Inject(DataSource) private readonly dataSource: DataSource;

    async createOrEditFlow(dto: CreateOrEditFlowDTO) {
        const duplicatedFlow = await this._findDuplicatedFlow(dto.segments as number[], dto.id);
        if (duplicatedFlow) {
            throw new ConflictException("این مسیر قبلا ثبت شده است");
        }
        const segments = await SegmentEntity.find({
            where: {id: In(dto.segments as number[])}
        });
        if (segments.length !== dto.segments.length) {
            throw new BadRequestException("بخش های وارد شده نادرست میباشد");
        }
        let flow = new FlowEntity();
        if (dto.id) {
            flow = await FlowEntity.findOneBy({id: dto.id});
            if (!flow) {
                throw new NotFoundException("مسیری با این سریال یافت نشد");
            }
        }
        flow.segments = segments;
        flow.formatedFlow = segments.map(segment => segment.label).join(" > ");
        flow.segmentsIds = segments.map(element => element.id).join(",");
        return flow.save();
    }

    getFlows() {
        return FlowEntity.find();
    }

    async getFlowsWithPage(page: number, limit: number) {
        const count = await FlowEntity.count();
        const content = await FlowEntity.find({take: limit, skip: limit * page});
        return {count, content};
    }

    _findDuplicatedFlow(segments: number[], id?: number) {
        const where = id ?
            {segmentsIds: segments.join(","), id: Not(id)} :
            {segmentsIds: segments.join(",")};
        return FlowEntity.count({
            where
        });
    }
}
