import {Column, Entity} from "typeorm";
import {CoreEntity} from "../core/database/core.entity";

@Entity({name: "_admin"})
export class AdminEntity extends CoreEntity {
    @Column({name: 'username', type: "varchar"})
    username: string;

    @Column({name: "password", type: "text"})
    password: string;
}