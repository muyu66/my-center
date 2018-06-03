import { Get, Post, Controller, Body, UseGuards } from '@nestjs/common';
import { CreateOneBonusDto } from '../dto/index';
import { ElemeBonusService } from '../service/index';
import { PipeValidation } from '../pipe/index';
import { BaseController } from './base.controller';

@Controller('eleme_bonus')
export class ElemeBonusController extends BaseController {

    constructor(
        private readonly elemeBonusService: ElemeBonusService,
    ) { super(); }

    @Post()
    public async createOne(@Body(new PipeValidation()) body: CreateOneBonusDto) {
        await this.elemeBonusService.createOneBonus(body);
        return true;
    }

}
