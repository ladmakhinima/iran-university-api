import {Column, Entity, JoinTable, ManyToMany, OneToMany} from "typeorm";
import {CoreEntity} from "../core/database/core.entity";
import {SegmentEntity} from "../segment/segment.entity";
import {PhoneEntity} from "../phone/phone.entity";

@Entity({name: "_flows"})
export class FlowEntity extends CoreEntity {
    @Column({name: 'formated_flow', type: "text"})
    formatedFlow: string;

    @ManyToMany(() => SegmentEntity)
    @JoinTable()
    segments: SegmentEntity[]

    @Column({name: "segments_ids", type: "text"})
    segmentsIds: string;

    @OneToMany(() => PhoneEntity, (phoneEntity) => phoneEntity.flow)
    phones: PhoneEntity[]
}