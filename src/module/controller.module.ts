import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TestController, ElemeBonusController } from '../controller/index';
import { ServiceModule } from './service.module';

@Module({
    controllers: [ElemeBonusController],
    imports: [ServiceModule],
})
export class ControllerModule { }
