import { AppSyncResolverEvent, Context } from 'aws-lambda';
import { EventControllerClass, IUserControllerCtor } from './controller';
export declare class AppSyncResolverEventControllerClass extends EventControllerClass<AppSyncResolverEvent<any, any>> {
    getHandlerName(event: AppSyncResolverEvent<any, any>): string;
    handle(input: AppSyncResolverEvent<any, any>, ctx: Context): Promise<any>;
}
export declare function AppSyncResolverEventController(UserController: IUserControllerCtor): any;
