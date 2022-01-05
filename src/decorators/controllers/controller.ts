import { Context } from 'aws-lambda'
import {
  ConfigurationStorage,
  getConfigurationStorage,
  IHandlerConfiguration,
} from '../..'

export interface Transformer<I = any, C = Context, O = any> {
  (input: I, ctx: C): Promise<O>
}

export interface Handler<I = any, C = Context, O = any> {
  (input: I, ctx: C): Promise<O>
}

export interface IEventControllerClass<E> {
  init?(): Promise<any>
  getHandlerName(event: E): string
  preprocess: Transformer
  handle: Handler
}

export interface IUserController extends Record<string | symbol, any> {}

export interface IUserControllerCtor {
  new (): IUserController
}

export abstract class EventControllerClass<E>
  implements IEventControllerClass<E>
{
  protected configStorage: ConfigurationStorage
  protected userControllerCtor: IUserControllerCtor
  protected userController: IUserController
  protected initializer: any
  protected initialized: boolean = false
  protected handlerConfig?: IHandlerConfiguration
  protected handlerArgs: any[]

  constructor(UserControllerCtor: IUserControllerCtor) {
    this.configStorage = getConfigurationStorage()
    this.userControllerCtor = UserControllerCtor
    this.userController = new UserControllerCtor()
    const initializerConfig = this.configStorage.findInitializer(
      this.userControllerCtor
    )
    this.initializer =
      initializerConfig && this.userController[initializerConfig.methodName]
  }

  abstract getHandlerName(event: E): string

  async preprocess(input: E, ctx: Context): Promise<any[]> {
    const handlerName = this.getHandlerName(input)
    const handlerConfig = (this.handlerConfig = this.configStorage.findHandler(
      this.userControllerCtor,
      handlerName
    ))

    if (!handlerConfig) {
      throw new Error(
        `There is no handler for the ${handlerName} defined on the controller`
      )
    }

    const params = this.configStorage.findParams(
      this.userControllerCtor,
      handlerConfig.methodName
    )

    const args = []

    for (const param of params) {
      args[param.parameterIndex] = param.resolve(input, ctx)
    }

    return Promise.all(args)
  }

  async handle(input: E, ctx: Context) {
    await this.initialize()
    const params = await this.preprocess(input, ctx)
    const handler = this.userController[this.handlerConfig!.methodName]
    const result = await handler.apply(this.userController, params)

    return result
  }

  async initialize() {
    if (!this.initialized && this.initializer) {
      await this.initializer.call(this.userController)
    }
  }
}

export abstract class RecordsControllerClass<
  E extends { Records: R[] },
  R
> extends EventControllerClass<E> {
  abstract getRecordHandlerName(input: R): string

  async preprocessRecord(input: R, ctx: Context): Promise<any[]> {
    const handlerName = this.getRecordHandlerName(input)
    const handlerConfig = (this.handlerConfig = this.configStorage.findHandler(
      this.userControllerCtor,
      handlerName
    ))

    if (!handlerConfig) {
      throw new Error(
        `There is no handler for the ${handlerName} defined on the controller`
      )
    }

    const params = this.configStorage.findParams(
      this.userControllerCtor,
      handlerConfig.methodName
    )

    const args = []

    for (const param of params) {
      args[param.parameterIndex] = param.resolve(input, ctx)
    }

    return Promise.all(args)
  }

  async handleRecords(input: E, ctx: Context) {
    await this.initialize()

    for (const record of input.Records) {
      const params = await this.preprocessRecord(record, ctx)
      const handler = this.userController[this.handlerConfig!.methodName]
      await handler.apply(this.userController, params)
    }
  }
}
