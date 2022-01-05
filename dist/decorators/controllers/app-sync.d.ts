import { AppSyncResolverEvent, Context } from 'aws-lambda';
import { EventControllerClass, IUserControllerCtor } from './controller';
import { IErrorHandler } from './error-handler';
export declare class AppSyncResolverEventControllerClass extends EventControllerClass<AppSyncResolverEvent<any, any>> {
    getHandlerName(event: AppSyncResolverEvent<any, any>): string;
    handle(input: AppSyncResolverEvent<any, any>, ctx: Context): Promise<any>;
}
export interface IAppSyncResolverEventControllerParams {
    errorHandler?: IErrorHandler<any>;
}
export declare function AppSyncResolverEventController({ errorHandler, }?: IAppSyncResolverEventControllerParams): (UserController: IUserControllerCtor) => any;
