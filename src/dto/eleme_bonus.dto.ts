import { } from '../const/index';
import { IsString, IsInt, IsIn, IsUrl, IsMobilePhone } from 'class-validator';

export class CreateOneBonusDto {

    @IsMobilePhone('zh-CN')
    readonly phone: string;

    @IsUrl()
    readonly url: string;

}