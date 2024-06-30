import {Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {SegmentService} from "./segment.service";
import {CreateSegmentDTO, EditSegmentDTO} from "./dtos";

@Controller('segment')
export class SegmentController {
    @Inject(SegmentService) private readonly segmentService: SegmentService;

    @Post()
    createSegment(@Body() dto: CreateSegmentDTO) {
        return this.segmentService.createSegment(dto);
    }

    @Patch(":id")
    updateSegmentLabelById(@Body() dto: EditSegmentDTO, @Param("id", ParseIntPipe) id: number) {
        return this.segmentService.editSegmentById(id, dto);
    }

    @Get('page')
    getSegmentsWithPage(@Query('limit') limit: number = 10, @Query('page') page: number = 0) {
        return this.segmentService.getSegmentsWithPage(+page, +limit);
    }

    @Get("tree")
    getSegmentsTrees() {
        return this.segmentService.getSegmentsTree();
    }

    @Get()
    getSegmentsList() {
        return this.segmentService.getSegmentsList();
    }
}
