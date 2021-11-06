import {
  Context,
  AppSyncResolverEvent,
  EventBridgeEvent,
  S3Event,
  S3EventRecord,
} from 'aws-lambda'
import {
  ConfigurationStorage,
  getConfigurationStorage,
  IHandlerConfiguration,
} from '..'

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
  protected configStorage: ConfigurationStorage
  protected Wrapper: any
  protected wrapper: W
  protected initializer: any
  protected initialized: boolean = false
  protected handlerConfig?: IHandlerConfiguration
  protected handlerArgs: any[]
  protected _handler: (...args: any[]) => any

  constructor(Wrapper: any) {
    this.configStorage = getConfigurationStorage()
    this.Wrapper = Wrapper
    this.wrapper = new Wrapper()
    const initializerConfig = this.configStorage.findInitializer(Wrapper)
    this.initializer =
      initializerConfig && this.wrapper[initializerConfig.methodName]
  }

  abstract getHandlerName(event: E): string

  async prepare(event: E, context: Context) {
    if (!this.initialized && this.initializer) {
      await this.initializer.call(this.wrapper)
      this.initialized = true
    }

    const handlerName = this.getHandlerName(event)

    const handlerConfig = (this.handlerConfig = this.configStorage.findHandler(
      this.Wrapper,
      handlerName
    ))

    if (!handlerConfig) {
      throw new Error(
        `There is no handler for the ${handlerName} defined on the controller`
      )
    }

    this._handler = this.wrapper[handlerConfig.methodName]
    const params = this.configStorage.findParams(
      this.Wrapper,
      handlerConfig.methodName
    )

    console.debug('prepare.params', JSON.stringify(params, null, 2))

    const args = []

    try {
      for (const param of params) {
        args[param.parameterIndex] = await param.resolve(event, context)
      }
    } catch (error) {
      // TODO: should be proper error handling mechanism depending on service
      console.error(error)
    }

    this.handlerArgs = args
  }

  async handler(event: E, context: Context) {
    console.debug('event: ', JSON.stringify(event, null, 2))
    await this.prepare(event, context)

    return await this._handler.apply(this.wrapper, this.handlerArgs)
  }
}

export abstract class RecordsControllerClass<
  W extends Record<string | symbol, any>,
  E extends { Records: R[] },
  R
> extends EventControllerClass<W, E> {
  abstract getRecordHandlerName(event: R): string

  async recordsHandler(event: E, context: Context) {
    console.debug('event: ', JSON.stringify(event, null, 2))

    if (!this.initialized && this.initializer) {
      await this.initializer.call(this.wrapper)
      this.initialized = true
    }

    for (const record of event.Records) {
      const handlerName = this.getRecordHandlerName(record)

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
          args[param.parameterIndex] = await param.resolve(record, context)
        }

        return await handler.apply(this.wrapper, args)
      } catch (error) {
        // TODO: should be proper error handling mechanism depending on service
        console.error(error)
      }
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

  async handler(event: AppSyncResolverEvent<any, any>, context: Context) {
    console.debug('event: ', JSON.stringify(event, null, 2))
    await this.prepare(event, context)

    if (!this.handlerConfig) {
      console.warn('Handler config not found')

      return
    }

    const { type } = this.handlerConfig

    const result = await this._handler.apply(this.wrapper, this.handlerArgs)

    return type === 'mutation'
      ? {
          __typename: result?.constructor?.name,
          ...result,
        }
      : result
  }
}

export function AppSyncResolverEventController(Wrapper: any) {
  const controller = new AppSyncResolverEventControllerClass(Wrapper)

  return controller.handler.bind(controller) as any
}

export class S3EventControllerClass extends RecordsControllerClass<
  any,
  S3Event,
  S3EventRecord
> {
  getHandlerName(event: S3Event) {
    return 'allRecords'
  }

  getRecordHandlerName(record: S3EventRecord) {
    return record.eventName
  }
}

export interface IRecordsControllerProps {
  mode: 'event' | 'record'
}

export function S3EventController(
  { mode = 'record' }: IRecordsControllerProps = {} as any
) {
  return function S3EventController(Wrapper: any) {
    const controller = new S3EventControllerClass(Wrapper)

    switch (mode) {
      case 'record':
        return controller.recordsHandler.bind(controller) as any
      case 'event':
        return controller.handler.bind(controller) as any
    }
  }
}
