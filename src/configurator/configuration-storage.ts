import { Context } from 'aws-lambda'
import { AnyObjectSchema } from 'yup'

export type ParamType = 'detail' | 'detailType' | 'argument' | 'eventRecord'

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

export type HandlerType = 'handler' | 'query' | 'mutation' | 'event'

export interface IHandlerConfiguration {
  type: HandlerType
  object: Object
  methodName: string | symbol
  route?: string | symbol
  options?: Record<string, any>
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
  handlers: Map<Object, Map<string | symbol, IHandlerConfiguration>> = new Map()
  params: IParam<any, any>[] = []
  errorHandlers: any[] = []
  initializers: IInitializerConfiguration[] = []
  validators: IValidatorConfiguration[] = []

  addParam<T, R>(param: IParam<T, R>) {
    this.params.push(param)
  }

  addHandler(handler: IHandlerConfiguration) {
    const { route = 'default', object } = handler
    const constructor = object.constructor
    const controllerHandlers = this.handlers.has(constructor)
      ? this.handlers.get(constructor)!
      : new Map<string | symbol, IHandlerConfiguration>()
    controllerHandlers.set(route, handler)
    this.handlers.set(constructor, controllerHandlers)
  }

  addInitializer(initializer: IInitializerConfiguration) {
    this.initializers.push(initializer)
  }

  addValidator(validator: IValidatorConfiguration) {
    this.validators.push(validator)
  }

  findHandler(object: Object, route: string = 'default') {
    const controllerHandlers = this.handlers.get(object)

    if (!controllerHandlers) {
      return undefined
    }

    return controllerHandlers.get(route)
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
