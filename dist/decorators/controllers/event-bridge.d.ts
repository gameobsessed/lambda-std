import { EventBridgeEvent } from 'aws-lambda';
import { EventControllerClass, IUserControllerCtor } from './controller';
import { IErrorHandler } from './error-handler';
export declare class EventBridgeEventControllerClass extends EventControllerClass<EventBridgeEvent<string, any>> {
    getHandlerName(event: EventBridgeEvent<any, any>): any;
}
export interface IEventBridgeEventControllerParams {
    errorHandler?: IErrorHandler<any>;
}
export declare function EventBridgeEventController({ errorHandler, }?: IEventBridgeEventControllerParams): (UserControllerCtor: IUserControllerCtor) => any;
