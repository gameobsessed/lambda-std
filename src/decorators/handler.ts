import { getConfigurationStorage } from '..'

export function DetailType(fieldName?: string) {
  return function (
    object: Object,
    methodName: string | symbol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor: PropertyDescriptor
  ) {
    getConfigurationStorage().addHandler({
      type: 'handler',
      object,
      methodName,
      route: fieldName || methodName,
    })
  }
}

export function Query(fieldName?: string) {
  return function (
    object: Object,
    methodName: string | symbol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor: PropertyDescriptor
  ) {
    getConfigurationStorage().addHandler({
      type: 'query',
      object,
      methodName,
      route: fieldName || methodName,
    })
  }
}
