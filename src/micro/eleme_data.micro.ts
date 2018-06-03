import * as Rabbit from 'rabbit.js';
import * as Config from 'config';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { Decimal } from 'decimal.js';
import { scheduleJob } from 'node-schedule';
import { _ } from '../common';

export class ElemeDataMicro extends Server implements CustomTransportStrategy {

    private readonly context: Rabbit.Context;
    private readonly channel: string;

    constructor() {
        super();
        const { host, prefix, channel } = Config.get('mq.rabbitmq');
        this.context = Rabbit.createContext(host);
        this.channel = prefix + channel;
    }

    public async listen() {
        // 0 11 * * * 每晚11点
        // 10 * * * * * 每10秒
        scheduleJob('0 11 * * *', () => {
            const coordinates = this.getCoordinatesByPoint(31.174544, 121.556468, 3);
            coordinates.subscribe((coordinate) => {
                this.push({
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    deep: 3,
                });
                console.log('push了一个elemeData的请求');
            });
        });
    }

    public close() {
        this.context && this.context.close(() => {
            console.log('Mq Close');
        });
    }

    protected push(data: object) {
        const send: any = this.context.socket('PUSH', { routing: 'direct', prefetch: 1 });
        send.connect(this.channel, () => {
            send.write(JSON.stringify(data), 'utf8');
        });
    }

    private getCoordinatesOfShanghai() {
        // const latitudeRange = [1, 1];
        // const longitudeRange = [2, 2];
    }

    private getCoordinatesByPoint(latitude: number, longitude: number, deep: number = 1) {
        const per = new Decimal(0.015); // 每3000米换算成大致的经纬度
        let coordinates: { latitude: number, longitude: number }[] = [];
        let level = 0;

        function get(la: number, lo: number) {
            level++;
            if (level >= Math.pow(9, deep)) return;

            const newLa = new Decimal(la);
            const newLo = new Decimal(lo);

            const points = [
                { latitude: newLa.sub(per).toNumber(), longitude: newLo.sub(per).toNumber() },
                { latitude: newLa.add(per).toNumber(), longitude: newLo.add(per).toNumber() },
                { latitude: newLa.sub(per).toNumber(), longitude: newLo.add(per).toNumber() },
                { latitude: newLa.add(per).toNumber(), longitude: newLo.sub(per).toNumber() },
                { latitude: newLa.toNumber(), longitude: newLo.add(per).toNumber() },
                { latitude: newLa.toNumber(), longitude: newLo.sub(per).toNumber() },
                { latitude: newLa.add(per).toNumber(), longitude: newLo.toNumber() },
                { latitude: newLa.sub(per).toNumber(), longitude: newLo.toNumber() },
                { latitude: newLa.toNumber(), longitude: newLo.toNumber() },
            ];

            coordinates = _.union(coordinates, points);

            for (const point of points) {
                get(point.latitude, point.longitude);
            }
        }

        get(latitude, longitude);
        return from(coordinates);
    }

}