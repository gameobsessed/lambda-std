import { Context } from 'aws-lambda';
import { ConfigurationStorage, IHandlerConfiguration } from '../..';
export interface Transformer<I = any, C = Context, O = any> {
    (input: I, ctx: C): Promise<O>;
}
export interface Handler<I = any, C = Context, O = any> {
    (input: I, ctx: C): Promise<O>;
}
export interface IEventControllerClass<E> {
    init?(): Promise<any>;
    getHandlerName(event: E): string;
    preprocess: Transformer;
    handle: Handler;
}
export interface IUserController extends Record<string | symbol, any> {
}
export interface IUserControllerCtor {
    new (): IUserController;
}
export declare abstract class EventControllerClass<E> implements IEventControllerClass<E> {
    protected configStorage: ConfigurationStorage;
    protected userControllerCtor: IUserControllerCtor;
    protected userController: IUserController;
    protected initializer: any;
    protected initialized: boolean;
    protected handlerConfig?: IHandlerConfiguration;
    protected handlerArgs: any[];
    constructor(UserControllerCtor: IUserControllerCtor);
    abstract getHandlerName(event: E): string;
    preprocess(input: E, ctx: Context): Promise<any[]>;
    handle(input: E, ctx: Context): Promise<any>;
    initialize(): Promise<void>;
}
export declare abstract class RecordsControllerClass<E extends {
    Records: R[];
}, R> extends EventControllerClass<E> {
    abstract getRecordHandlerName(input: R): string;
    preprocessRecord(input: R, ctx: Context): Promise<any[]>;
    handleRecords(input: E, ctx: Context): Promise<void>;
}
