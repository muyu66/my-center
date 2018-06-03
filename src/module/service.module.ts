import { Module, HttpModule } from '@nestjs/common';
import { TestService, ElemeBonusService } from '../service/index';
import { DaoModule } from './dao.module';

@Module({
    imports: [HttpModule],
    providers: [ElemeBonusService],
    exports: [ElemeBonusService],
})

export class ServiceModule { }
