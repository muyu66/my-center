import { Injectable, HttpService } from '@nestjs/common';
import { BaseService } from './base.service';
import { TestDao } from '../dao';
import { CreateOneBonusDto } from '../dto';

@Injectable()
export class ElemeBonusService extends BaseService {

    constructor(
        private readonly httpService: HttpService,
    ) { super(); }

    public async createOneBonus(dto: CreateOneBonusDto) {
        const res = await this.send(dto);
        return res.data;
    }

    private async send(body: CreateOneBonusDto) {
        const url = 'https://service-kmd1cep1-1253155229.ap-shanghai.apigateway.myqcloud.com/test/test';
        return await this.httpService.post(url, body).toPromise();
    }

}