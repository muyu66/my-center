import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { } from './middleware/index';
import * as Config from 'config';
import { ElemeDataMicro } from './micro/eleme_data.micro';
import * as util from 'util';

const { port } = Config.get('server');

// 原生方法注入
const console_log = console.log;
console.log = function log(...objs: any[]): void {
    for (const obj of objs) {
        console_log(`[${new Date().toLocaleString()}] - `, obj);
    }
};
console.debug = function dump(...objs: any[]): void {
    for (const obj of objs) {
        console.log(util.inspect(obj, true, 8, true));
    }
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice({
        strategy: new ElemeDataMicro(),
    });

    // 设置全局前缀
    // app.setGlobalPrefix('v1');

    /**
     * 加载全局中间件
     */

    await app.startAllMicroservices();
    await app.listen(Number(port) || 3000);
}
bootstrap();