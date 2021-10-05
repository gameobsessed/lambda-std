import { Context } from 'aws-lambda'
import { AnyObjectSchema } from 'yup'

export type ParamType = 'detail' | 'detailType'

export interface IParamConfiguration {
  type: ParamType
  object: Object
  methodName: string | symbol
  parameterIndex: number
  targetType?: any
  parse?: boolean
}

export interface IParam<T, R> extends IParamConfiguration {
  resolve(event: T, context: Context): Promise<R>
}

export type HandlerType = 'handler'

export interface IHandlerConfiguration {
  type: HandlerType
  object: Object
  methodName: string | symbol
}

export interface IInitializerConfiguration {
  object: Object
  methodName: string | symbol
}

export interface IValidatorConfiguration {
  object: Object
  schema: AnyObjectSchema
  options?: any
}

export class ConfigurationStorage {
  controllers: any[] = []
  handlers: IHandlerConfiguration[] = []
  params: IParam<any, any>[] = []
  errorHandlers: any[] = []
  initializers: IInitializerConfiguration[] = []
  validators: IValidatorConfiguration[] = []

  addParam<T, R>(param: IParam<T, R>) {
    this.params.push(param)
  }

  addHandler(handler: IHandlerConfiguration) {
    this.handlers.push(handler)
  }

  addInitializer(initializer: IInitializerConfiguration) {
    this.initializers.push(initializer)
  }

  addValidator(validator: IValidatorConfiguration) {
    this.validators.push(validator)
  }

  findHandler(object: Object) {
    return this.handlers.find(
      (handler) => handler.object.constructor === object
    )
  }

  findInitializer(object: Object) {
    return this.initializers.find(
      (initializer) => initializer.object.constructor === object
    )
  }

  findParams(object: Object, methodName: string | symbol) {
    return this.params.filter(
      (param) =>
        param.object.constructor === object && param.methodName === methodName
    )
  }

  findValidator(object: Object) {
    return this.validators.find((handler) => handler.object === object)
  }
}
