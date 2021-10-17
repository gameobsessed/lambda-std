import { Context, AppSyncResolverEvent, EventBridgeEvent } from 'aws-lambda'
import { ConfigurationStorage, getConfigurationStorage } from '..'

export function Controller<T>(Wrapper: any) {
  const configStorage = getConfigurationStorage()
  const handlerConfig = configStorage.findHandler(Wrapper)

  if (!handlerConfig) {
    throw new Error('One handler should be defined on the controller')
  }
  const initializerConfig = configStorage.findInitializer(Wrapper)

  const wrapper = new Wrapper()
  const handler = wrapper[handlerConfig.methodName]
  const initializer =
    initializerConfig && wrapper[initializerConfig?.methodName]
  const params = configStorage.findParams(Wrapper, handlerConfig.methodName)

  let initialized = false

  return async function (event: T, context: Context) {
    if (!initialized && initializerConfig) {
      await initializer.call(wrapper)
      initialized = true
    }

    const args = []

    try {
      for (const param of params) {
        args[param.parameterIndex] = await param.resolve(event, context)
      }

      return await handler.apply(wrapper, args)
    } catch (error) {
      console.error(error)
    }
  } as any
}

export abstract class EventControllerClass<
  W extends Record<string | symbol, any>,
  E
> {
  private configStorage: ConfigurationStorage
  private Wrapper: any
  private wrapper: W
  private initializer: any
  private initialized: boolean = false

  constructor(Wrapper: any) {
    this.configStorage = getConfigurationStorage()
    this.Wrapper = Wrapper
    this.wrapper = new Wrapper()
    const initializerConfig = this.configStorage.findInitializer(Wrapper)
    this.initializer =
      initializerConfig && this.wrapper[initializerConfig.methodName]
  }

  abstract getHandlerName(event: E): string

  async handler(event: E, context: Context) {
    console.debug('event: ', JSON.stringify(event, null, 2))

    if (!this.initialized && this.initializer) {
      await this.initializer.call(this.wrapper)
      this.initialized = true
    }

    const handlerName = this.getHandlerName(event)

    const handlerConfig = this.configStorage.findHandler(
      this.Wrapper,
      handlerName
    )

    if (!handlerConfig) {
      throw new Error(
        `There is no handler for the ${handlerName} defined on the controller`
      )
    }

    const handler = this.wrapper[handlerConfig.methodName]
    const params = this.configStorage.findParams(
      this.Wrapper,
      handlerConfig.methodName
    )

    const args = []

    try {
      for (const param of params) {
        args[param.parameterIndex] = await param.resolve(event, context)
      }

      return await handler.apply(this.wrapper, args)
    } catch (error) {
      // TODO: should be proper error handling mechanism depending on service
      console.error(error)
    }
  }
}

export class EventBridgeEventControllerClass extends EventControllerClass<
  any,
  EventBridgeEvent<string, any>
> {
  getHandlerName(event: EventBridgeEvent<any, any>) {
    return event['detail-type']
  }
}

export function EventBridgeEventController(Wrapper: any) {
  const controller = new EventBridgeEventControllerClass(Wrapper)

  return controller.handler.bind(controller) as any
}

export class AppSyncResolverEventControllerClass extends EventControllerClass<
  any,
  AppSyncResolverEvent<any, any>
> {
  getHandlerName(event: AppSyncResolverEvent<any, any>) {
    return event.info?.fieldName
  }
}

export function AppSyncResolverEventController(Wrapper: any) {
  const controller = new AppSyncResolverEventControllerClass(Wrapper)

  return controller.handler.bind(controller) as any
}
