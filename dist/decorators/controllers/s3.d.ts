import { S3Event, S3EventRecord } from 'aws-lambda';
import { IUserControllerCtor, RecordsControllerClass } from './controller';
import { IErrorHandler } from './error-handler';
export declare class S3EventControllerClass extends RecordsControllerClass<S3Event, S3EventRecord> {
    getHandlerName(): string;
    getRecordHandlerName(record: S3EventRecord): string;
}
export interface IRecordsControllerProps {
    mode: 'event' | 'record';
    errorHandler?: IErrorHandler<any>;
}
export declare function S3EventController({ mode, errorHandler, }?: IRecordsControllerProps): (UserControllerCtor: IUserControllerCtor) => any;
