import { Context } from 'aws-lambda'
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
