import { getConfigurationStorage } from '..'

export function Initializer(
  object: Object,
  methodName: string | symbol,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  descriptor: PropertyDescriptor
) {
  getConfigurationStorage().addInitializer({
    object,
    methodName,
  })
}
