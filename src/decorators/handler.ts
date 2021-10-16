import { getConfigurationStorage } from '..'

export function DetailType(...fieldNames: string[]) {
  return function (
    object: Object,
    methodName: string | symbol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    descriptor: PropertyDescriptor
  ) {
    for (const fieldName of [...fieldNames, methodName]) {
      getConfigurationStorage().addHandler({
        type: 'handler',
        object,
        methodName,
        route: fieldName,
      })
    }
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
