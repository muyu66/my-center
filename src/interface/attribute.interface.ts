import { Document } from 'mongoose';

export namespace IAttribute {

    interface Base extends Document {

    }

    export interface ITest extends Base {
        name: string;
    }

}