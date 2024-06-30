import {Module} from "@nestjs/common";
import {DatabaseService} from "./database.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: DatabaseService
        })
    ]
})
export class DatabaseModule {
}