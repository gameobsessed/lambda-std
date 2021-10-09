import { Context, AppSyncResolverEvent } from 'aws-lambda'
import { getConfigurationStorage } from '..'

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

export function AppSyncResolverEventController(Wrapper: any) {
  const configStorage = getConfigurationStorage()

  const initializerConfig = configStorage.findInitializer(Wrapper)

  const wrapper = new Wrapper()
  const initializer = initializerConfig && wrapper[initializerConfig.methodName]

  let initialized = false

  return async function (event: AppSyncResolverEvent<any>, context: Context) {
    if (!initialized && initializerConfig) {
      await initializer.call(wrapper)
      initialized = true
    }

    const { fieldName } = event.info

    const handlerConfig = configStorage.findHandler(Wrapper, fieldName)

    if (!handlerConfig) {
      throw new Error(
        `There is no handler for the ${fieldName} defined on the controller`
      )
    }

    const handler = wrapper[handlerConfig.methodName]
    const params = configStorage.findParams(Wrapper, handlerConfig.methodName)

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
