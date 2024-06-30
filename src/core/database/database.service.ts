import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import {UserEntity} from "../../user/user.entity";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            port: this.configService.get<number>("DB_PORT"),
            username: this.configService.get<string>("DB_USERNAME"),
            password: this.configService.get<string>("DB_PASSWORD") as any,
            database: this.configService.get<string>("DB_NAME"),
            type: this.configService.get<any>("DB_TYPE"),
            host: this.configService.get<string>("DB_HOST"),
            synchronize: true,
            autoLoadEntities: true,
            entities: [UserEntity]
        }
    }
}