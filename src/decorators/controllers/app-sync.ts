import { AppSyncResolverEvent, Context } from 'aws-lambda'
import { EventControllerClass, IUserControllerCtor } from './controller'

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

export function AppSyncResolverEventController(UserController: IUserControllerCtor) {
  const controller = new AppSyncResolverEventControllerClass(UserController)
  const handler = controller.handle.bind(controller)

  return async function executeHandler(...args: [any, any]) {
    let result

    try {
      result = await handler(...args)
    } catch (error) {
      console.debug('Execute Handler Error')
      throw error
    }

    return result
  } as any
}
