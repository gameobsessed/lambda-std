import { AppSyncResolverEvent, Context } from 'aws-lambda'
import { EventControllerClass, IUserControllerCtor } from './controller'
import { defaultErrorHandler, IErrorHandler } from './error-handler'

export class AppSyncResolverEventControllerClass extends EventControllerClass<
  AppSyncResolverEvent<any, any>
> {
  getHandlerName(event: AppSyncResolverEvent<any, any>) {
    return event.info?.fieldName
  }

  async handle(input: AppSyncResolverEvent<any, any>, ctx: Context) {
    await this.initialize()
    const params = await this.preprocess(input, ctx)
    const handler = this.userController[this.handlerConfig!.methodName]
    const result = await handler.apply(this.userController, params)
    const { type } = this.handlerConfig!

    return type === 'mutation'
      ? {
          __typename: result?.constructor?.name,
          ...result,
        }
      : result
  }
}

export interface IAppSyncResolverEventControllerParams {
  errorHandler?: IErrorHandler<any>
}

export function AppSyncResolverEventController({
  errorHandler = defaultErrorHandler,
}: IAppSyncResolverEventControllerParams = {}) {
  return function AppSyncResolverEventController(
    UserController: IUserControllerCtor
  ) {
    const controller = new AppSyncResolverEventControllerClass(UserController)
    const handler = controller.handle.bind(controller)

    return async function executeAppSyncResolverEventHandler(
      ...args: [any, any]
    ) {
      let result

      try {
        result = await handler(...args)
      } catch (error) {
        return errorHandler(error)
      }

      return result
    } as any
  }
}
