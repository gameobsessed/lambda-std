import { getConfigurationStorage } from '..'

export function Handler(
  object: Object,
  methodName: string | symbol,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  descriptor: PropertyDescriptor
) {
  getConfigurationStorage().addHandler({
    type: 'handler',
    object,
    methodName,
  })
}
