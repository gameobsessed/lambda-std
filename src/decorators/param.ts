import { plainToClass } from 'class-transformer'
import { EventBridgeEvent } from 'aws-lambda'
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
    const targetType = types[parameterIndex]
    const configurationStorage = getConfigurationStorage()
    const validatorConfig = configurationStorage.findValidator(targetType)

    configurationStorage.addParam({
      type: 'detail',
      object,
      methodName,
      parameterIndex,
      parse: options?.parse ?? true,
      targetType,
      async resolve(event: EventBridgeEvent<any, any>) {
        let parsed: any

        try {
          parsed = JSON.parse(event.detail)
        } catch (e) {
          // TODO: replace with custom errors
          throw new Error('Body parsing error')
        }

        const validated = validatorConfig
          ? validatorConfig.schema.validateSync(parsed, {
              abortEarly: false,
              stripUnknown: true,
            })
          : parsed

        const obj = targetType ? plainToClass(targetType, validated) : parsed

        return obj
      },
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DetailType(options?: IDetailOptions) {
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
