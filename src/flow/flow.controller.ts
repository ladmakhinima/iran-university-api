import {Body, Controller, Get, Inject, Post, Query} from '@nestjs/common';
import {FlowService} from "./flow.service";
import {CreateOrEditFlowDTO} from "./dtos";

@Controller('flow')
export class FlowController {
    @Inject(FlowService) private readonly flowService: FlowService;

    @Post()
    createOrEditByIdFlow(@Body() dto: CreateOrEditFlowDTO) {
        return this.flowService.createOrEditFlow(dto);
    }

    @Get('page')
    getFlows(@Query('page') page: number = 0, @Query('limit') limit: number = 10) {
        return this.flowService.getFlowsWithPage(+page, +limit);
    }

    @Get()
    getFlows() {
        return this.flowService.getFlows();
    }
}
