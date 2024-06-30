import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {CoreEntity} from "../core/database/core.entity";
import {FlowEntity} from "../flow/flow.entity";

export enum PhoneAccessStatus {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}

@Entity({name: "_phones"})
export class PhoneEntity extends CoreEntity {
    @Column({name: "title", type: "varchar"})
    title: string;

    @Column({name: "phone", type: "varchar"})
    phone: string;

    @Column({name: "internal_phone", type: "varchar"})
    internalPhone: string;

    @Column({name: "responsible_name", type: "varchar"})
    responsibleName: string;

    @Column({name: "responsible_phone", type: "varchar"})
    responsiblePhone: string;

    @Column({name: "access_status", type: "varchar"})
    accessStatus: PhoneAccessStatus;

    @ManyToOne(() => FlowEntity)
    @JoinColumn()
    flow: FlowEntity
}