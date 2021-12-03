import { plainToInstance } from 'class-transformer'
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
        const parsed: any = event.detail

        const validated = validatorConfig
          ? await validatorConfig.validate(parsed)
          : parsed

        const obj = targetType
          ? plainToInstance(targetType, validated, { ignoreDecorators: true })
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
        console.log('argument.resolve.enter', JSON.stringify(event, null, 2))
        const arg: any = argumentName
          ? event.arguments[argumentName]
          : event.arguments

        const validated = validatorConfig
          ? await validatorConfig.validate(arg)
          : arg

        console.log(
          'argument.resolve.validated',
          JSON.stringify(validated, null, 2)
        )

        const obj = targetType ? plainToInstance(targetType, validated) : arg

        return obj
      },
    })
  }
}

export function Source(options?: IDetailOptions) {
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
      type: 'source',
      object,
      methodName,
      parameterIndex,
      parse: options?.parse ?? true,
      targetType,
      async resolve(event: AppSyncResolverEvent<any>) {
        console.debug('source.resolve.enter', JSON.stringify(event, null, 2))
        const { source }: any = event

        const validated = validatorConfig
          ? await validatorConfig.validate(source)
          : source

        console.debug(
          'source.resolve.validated',
          JSON.stringify(validated, null, 2)
        )

        const obj = targetType ? plainToInstance(targetType, validated) : source

        return obj
      },
    })
  }
}

export function EventRecord(extractor?: (record: any) => any) {
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

    getConfigurationStorage().addParam({
      type: 'eventRecord',
      object,
      methodName,
      parameterIndex,
      async resolve(event: any) {
        const arg: any = extractor ? extractor(event) : event
        const validated = validatorConfig
          ? await validatorConfig.validate(arg)
          : arg

        const obj = targetType ? plainToInstance(targetType, validated) : arg

        return obj
      },
    })
  }
}
