import { EventBridgeEvent } from 'aws-lambda';
import { EventControllerClass, IUserControllerCtor } from './controller';
export declare class EventBridgeEventControllerClass extends EventControllerClass<EventBridgeEvent<string, any>> {
    getHandlerName(event: EventBridgeEvent<any, any>): any;
}
export declare function EventBridgeEventController(UserControllerCtor: IUserControllerCtor): any;
