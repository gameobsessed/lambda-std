import { Context, AppSyncResolverEvent, EventBridgeEvent, S3Event, S3EventRecord } from 'aws-lambda';
import { ConfigurationStorage } from '..';
export declare function Controller<T>(Wrapper: any): any;
export declare abstract class EventControllerClass<W extends Record<string | symbol, any>, E> {
    protected configStorage: ConfigurationStorage;
    protected Wrapper: any;
    protected wrapper: W;
    protected initializer: any;
    protected initialized: boolean;
    constructor(Wrapper: any);
    abstract getHandlerName(event: E): string;
    handler(event: E, context: Context): Promise<any>;
}
export declare abstract class RecordsControllerClass<W extends Record<string | symbol, any>, E extends {
    Records: R[];
}, R> extends EventControllerClass<W, E> {
    abstract getRecordHandlerName(event: R): string;
    recordsHandler(event: E, context: Context): Promise<any>;
}
export declare class EventBridgeEventControllerClass extends EventControllerClass<any, EventBridgeEvent<string, any>> {
    getHandlerName(event: EventBridgeEvent<any, any>): any;
}
export declare function EventBridgeEventController(Wrapper: any): any;
export declare class AppSyncResolverEventControllerClass extends EventControllerClass<any, AppSyncResolverEvent<any, any>> {
    getHandlerName(event: AppSyncResolverEvent<any, any>): string;
}
export declare function AppSyncResolverEventController(Wrapper: any): any;
export declare class S3EventControllerClass extends RecordsControllerClass<any, S3Event, S3EventRecord> {
    getHandlerName(event: S3Event): string;
    getRecordHandlerName(record: S3EventRecord): string;
}
export interface IRecordsControllerProps {
    mode: 'event' | 'record';
}
export declare function S3EventController({ mode }?: IRecordsControllerProps): (Wrapper: any) => any;
