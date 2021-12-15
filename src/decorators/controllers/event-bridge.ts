import { EventBridgeEvent } from 'aws-lambda'
import { EventControllerClass, IUserControllerCtor } from './controller'

export class EventBridgeEventControllerClass extends EventControllerClass<
  EventBridgeEvent<string, any>
> {
  getHandlerName(event: EventBridgeEvent<any, any>) {
    return event['detail-type']
  }
}

export function EventBridgeEventController(
  UserControllerCtor: IUserControllerCtor
) {
  const controller = new EventBridgeEventControllerClass(UserControllerCtor)

  return controller.handle.bind(controller) as any
}
