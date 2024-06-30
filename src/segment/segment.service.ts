import {ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {CreateSegmentDTO, EditSegmentDTO} from "./dtos";
import {SegmentEntity} from "./segment.entity";
import {DataSource, IsNull, Not} from "typeorm";

@Injectable()
export class SegmentService {
    @Inject(DataSource) private readonly dataSource: DataSource;

    async createSegment(dto: CreateSegmentDTO) {
        const duplicatedLabelOnSameLayer = await this._checkDuplicatedLabelOnSameLayer(dto.label);
        if (duplicatedLabelOnSameLayer) {
            throw new ConflictException("عنوان بخش در این سطح از قبل ثبت شده است");
        }
        if (dto.parent) {
            dto.parent = await SegmentEntity.findOneBy({id: dto.parent as number});
            if (!dto.parent) {
                throw  new NotFoundException("بخش پدر با این سریال یافت نشد");
            }
        }
        const segment = new SegmentEntity();
        segment.label = dto.label;
        segment.parent = dto.parent as SegmentEntity;
        return segment.save();
    }

    async editSegmentById(id: number, dto: EditSegmentDTO) {
        const segment = await SegmentEntity.findOneBy({id});
        if (!segment) {
            throw new NotFoundException("بخشی با این سریال یافت نشد");
        }
        const duplicatedLabelOnSameLayer = await this._checkDuplicatedLabelOnSameLayer(dto.label, id);
        if (duplicatedLabelOnSameLayer) {
            throw new ConflictException("عنوان بخش در این سطح از قبل ثبت شده است");
        }
        segment.label = dto.label;
    }

    getSegmentsList() {
        return SegmentEntity.find({where: {parent: IsNull()}});
    }

    getSegmentsTree() {
        return this.dataSource.getTreeRepository(SegmentEntity).findTrees();
    }

    async getSegmentsWithPage(page: number, limit: number) {
        const count = await SegmentEntity.count();
        const content = await SegmentEntity.find({
            skip: page * limit,
            take: limit,
            order: {
                createdAt: -1
            }
        });
        return {count, content};
    }

    async _checkDuplicatedLabelOnSameLayer(label: string, id?: number) {
        const where = id ? {label, id: Not(id)} : {label};
        return SegmentEntity.count({where});
    }
}
