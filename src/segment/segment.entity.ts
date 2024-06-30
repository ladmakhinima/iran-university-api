import {Column, Entity, Tree, TreeChildren, TreeParent} from "typeorm";
import {CoreEntity} from "../core/database/core.entity";

@Tree("nested-set")
@Entity({name: "_segments"})
export class SegmentEntity extends CoreEntity {
    @Column({name: "label", type: 'varchar'})
    label: string;

    @TreeParent()
    parent: SegmentEntity;

    @TreeChildren()
    childrens: SegmentEntity[]
}