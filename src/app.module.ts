import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {DatabaseModule} from "./core/database/database.module";
import { UserModule } from './user/user.module';
import { FlowModule } from './flow/flow.module';
import { SegmentModule } from './segment/segment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        DatabaseModule,
        UserModule,
        FlowModule,
        SegmentModule
    ]
})
export class AppModule {
}