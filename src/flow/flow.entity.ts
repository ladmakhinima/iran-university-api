import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {CoreEntity} from "../core/database/core.entity";
import {SegmentEntity} from "../segment/segment.entity";

@Entity({name: "_flows"})
export class FlowEntity extends CoreEntity {
    @Column({name: 'formated_flow', type: "text"})
    formatedFlow: string;

    @ManyToMany(() => SegmentEntity)
    @JoinTable()
    segments: SegmentEntity[]

    @Column({name: "segments_ids", type: "text"})
    segmentsIds: string;
}