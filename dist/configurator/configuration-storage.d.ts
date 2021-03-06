import { Context } from 'aws-lambda';
export declare type ParamType = 'detail' | 'detailType' | 'argument' | 'source' | 'eventRecord';
export interface IParamConfiguration {
    type: ParamType;
    object: Object;
    methodName: string | symbol;
    parameterIndex: number;
    targetType?: any;
    parse?: boolean;
}
export interface IParam<T, R> extends IParamConfiguration {
    resolve(event: T, context: Context): Promise<R>;
}
export declare type HandlerType = 'handler' | 'query' | 'mutation' | 'event';
export interface IHandlerConfiguration {
    type: HandlerType;
    object: Object;
    methodName: string | symbol;
    route?: string | symbol;
    options?: Record<string, any>;
}
export interface IInitializerConfiguration {
    object: Object;
    methodName: string | symbol;
}
export interface IValidate {
    (...args: any[]): Promise<any>;
}
export interface IValidatorConfiguration {
    object: Object;
    validate: IValidate;
    options?: any;
}
export declare class ConfigurationStorage {
    controllers: any[];
    handlers: Map<Object, Map<string | symbol, IHandlerConfiguration>>;
    params: IParam<any, any>[];
    errorHandlers: any[];
    initializers: IInitializerConfiguration[];
    validators: IValidatorConfiguration[];
    addParam<T, R>(param: IParam<T, R>): void;
    addHandler(handler: IHandlerConfiguration): void;
    addInitializer(initializer: IInitializerConfiguration): void;
    addValidator(validator: IValidatorConfiguration): void;
    findHandler(object: Object, route?: string): IHandlerConfiguration | undefined;
    findInitializer(object: Object): IInitializerConfiguration | undefined;
    findParams(object: Object, methodName: string | symbol): IParam<any, any>[];
    findValidator(object: Object): IValidatorConfiguration | undefined;
}
