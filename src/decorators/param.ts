import { plainToClass } from 'class-transformer'
import { EventBridgeEvent, AppSyncResolverEvent } from 'aws-lambda'
import { getConfigurationStorage } from '..'

export interface IDetailOptions {
  parse: boolean
}

export function Detail(options?: IDetailOptions) {
  return function (
    object: Object,
    methodName: string | symbol,
    parameterIndex: number
  ) {
    const types = (Reflect as any).getMetadata(
      'design:paramtypes',
      object,
      methodName
    )
    const targetType = types?.[parameterIndex]
    const configurationStorage = getConfigurationStorage()
    const validatorConfig = configurationStorage.findValidator(targetType)

    configurationStorage.addParam({
      type: 'detail',
      object,
      methodName,
      parameterIndex,
      targetType,
      async resolve(event: EventBridgeEvent<any, any>) {
        let parsed: any = event.detail

        const validated = validatorConfig
          ? validatorConfig.schema.validateSync(parsed, {
              abortEarly: false,
              stripUnknown: true,
            })
          : parsed

        const obj = targetType
          ? plainToClass(targetType, validated, { ignoreDecorators: true })
          : parsed

        return obj
      },
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EventDetailType(options?: IDetailOptions) {
  return function (
    object: Object,
    methodName: string | symbol,
    parameterIndex: number
  ) {
    getConfigurationStorage().addParam({
      type: 'detailType',
      object,
      methodName,
      parameterIndex,
      resolve(event: EventBridgeEvent<any, any>) {
        return event['detail-type']
      },
    })
  }
}

export function Arguments(
  argumentName: string | undefined = undefined,
  options?: IDetailOptions
) {
  return function (
    object: Object,
    methodName: string | symbol,
    parameterIndex: number
  ) {
    const types = (Reflect as any).getMetadata(
      'design:paramtypes',
      object,
      methodName
    )
    const targetType = types?.[parameterIndex]
    const configurationStorage = getConfigurationStorage()
    const validatorConfig =
      targetType && configurationStorage.findValidator(targetType)

    configurationStorage.addParam({
      type: 'argument',
      object,
      methodName,
      parameterIndex,
      parse: options?.parse ?? true,
      targetType,
      async resolve(event: AppSyncResolverEvent<any>) {
        let arg: any = argumentName
          ? event.arguments[argumentName]
          : event.arguments

        const validated = validatorConfig
          ? validatorConfig.schema.validateSync(arg, {
              abortEarly: false,
              stripUnknown: true,
            })
          : arg

        const obj = targetType ? plainToClass(targetType, validated) : arg

        return obj
      },
    })
  }
}

export function EventBody(extractor?: (record: any) => any) {
  return function (
    object: Object,
    methodName: string | symbol,
    parameterIndex: number
  ) {
    getConfigurationStorage().addParam({
      type: 'eventBody',
      object,
      methodName,
      parameterIndex,
      resolve(event: any) {
        return extractor ? extractor(event) : event
      },
    })
  }
}
