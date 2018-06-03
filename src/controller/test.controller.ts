import { Get, Post, Controller, Body, UseGuards } from '@nestjs/common';
import { CreateTestDto } from '../dto/index';
import { TestService } from '../service/index';
import { PipeValidation } from '../pipe/index';
import { DUser, DLimit } from '../decorator/index';
import { } from '../const/index';
import { GuardLimit } from '../guard/index';
import { BaseController } from './base.controller';

@Controller('tests')
export class TestController extends BaseController {

    constructor(
        private readonly testService: TestService,
    ) { super(); }

}
