import { Context, AppSyncResolverEvent, EventBridgeEvent } from 'aws-lambda';
export declare function Controller<T>(Wrapper: any): any;
export declare abstract class EventControllerClass<W extends Record<string | symbol, any>, E> {
    private configStorage;
    private Wrapper;
    private wrapper;
    private initializer;
    private initialized;
    constructor(Wrapper: any);
    abstract getHandlerName(event: E): string;
    handler(event: E, context: Context): Promise<any>;
}
export declare class EventBridgeEventControllerClass extends EventControllerClass<any, EventBridgeEvent<string, any>> {
    getHandlerName(event: EventBridgeEvent<any, any>): any;
}
export declare function EventBridgeEventController(Wrapper: any): any;
export declare class AppSyncResolverEventControllerClass extends EventControllerClass<any, AppSyncResolverEvent<any, any>> {
    getHandlerName(event: AppSyncResolverEvent<any, any>): string;
}
export declare function AppSyncResolverEventController(Wrapper: any): any;
