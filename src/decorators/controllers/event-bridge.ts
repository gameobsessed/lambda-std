import { EventBridgeEvent } from 'aws-lambda'
import { EventControllerClass, IUserControllerCtor } from './controller'
import { defaultErrorHandler, IErrorHandler } from './error-handler'

export class EventBridgeEventControllerClass extends EventControllerClass<
  EventBridgeEvent<string, any>
> {
  getHandlerName(event: EventBridgeEvent<any, any>) {
    return event['detail-type']
  }
}

export interface IEventBridgeEventControllerParams {
  errorHandler?: IErrorHandler<any>
}

export function EventBridgeEventController({
  errorHandler = defaultErrorHandler,
}: IEventBridgeEventControllerParams = {}) {
  return function EventBridgeEventController(
    UserControllerCtor: IUserControllerCtor
  ) {
    const controller = new EventBridgeEventControllerClass(UserControllerCtor)
    const handler = controller.handle.bind(controller) as any

    return async function executeEventBridgeEventHandler(...args: [any, any]) {
      let result

      try {
        result = await handler(...args)
      } catch (error) {
        return errorHandler(error)
      }

      return result
    } as any
  }
}
