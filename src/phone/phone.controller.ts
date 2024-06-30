import {Body, Controller, Get, Inject, Post, Query} from '@nestjs/common';
import {PhoneService} from "./phone.service";
import {CreateOrEditPhoneDTO} from "./dtos";

@Controller('phone')
export class PhoneController {
    @Inject(PhoneService) private readonly phoneService: PhoneService;

    @Post()
    createOrEditPhone(@Body() dto: CreateOrEditPhoneDTO) {
        return this.phoneService.createOrEditPhone(dto);
    }

    @Get('page')
    getPhonesWithPage(@Query('limit') limit: number = 10, @Query('page') page: number = 0) {
        return this.phoneService.getPhonesWithPage(+page, +limit);
    }
}
