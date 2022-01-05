import { S3Event, S3EventRecord } from 'aws-lambda';
import { IUserControllerCtor, RecordsControllerClass } from './controller';
export declare class S3EventControllerClass extends RecordsControllerClass<S3Event, S3EventRecord> {
    getHandlerName(): string;
    getRecordHandlerName(record: S3EventRecord): string;
}
export interface IRecordsControllerProps {
    mode: 'event' | 'record';
}
export declare function S3EventController({ mode }?: IRecordsControllerProps): (UserControllerCtor: IUserControllerCtor) => any;
