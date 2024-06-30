import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = await app.get<ConfigService>(ConfigService);
    const port = configService.get<number>("PORT");

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port, () => {
        console.log(`the server run at : ${port}`)
    });
}

bootstrap();
