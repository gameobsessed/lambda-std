import { Context } from 'aws-lambda';
import { AnyObjectSchema } from 'yup';
export declare type ParamType = 'detail' | 'detailType';
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
export declare type HandlerType = 'handler';
export interface IHandlerConfiguration {
    type: HandlerType;
    object: Object;
    methodName: string | symbol;
}
export interface IInitializerConfiguration {
    object: Object;
    methodName: string | symbol;
}
export interface IValidatorConfiguration {
    object: Object;
    schema: AnyObjectSchema;
    options?: any;
}
export declare class ConfigurationStorage {
    controllers: any[];
    handlers: IHandlerConfiguration[];
    params: IParam<any, any>[];
    errorHandlers: any[];
    initializers: IInitializerConfiguration[];
    validators: IValidatorConfiguration[];
    addParam<T, R>(param: IParam<T, R>): void;
    addHandler(handler: IHandlerConfiguration): void;
    addInitializer(initializer: IInitializerConfiguration): void;
    addValidator(validator: IValidatorConfiguration): void;
    findHandler(object: Object): IHandlerConfiguration | undefined;
    findInitializer(object: Object): IInitializerConfiguration | undefined;
    findParams(object: Object, methodName: string | symbol): IParam<any, any>[];
    findValidator(object: Object): IValidatorConfiguration | undefined;
}
