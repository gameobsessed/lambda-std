import { ConfigurationStorage, IHandlerConfiguration } from '..'

describe('configuration storage', () => {
  it('should save and retrieve default handler', () => {
    const storage = new ConfigurationStorage()
    const controller = () => {}
    const handler: IHandlerConfiguration = {
      type: 'handler',
      object: controller,
      methodName: 'methodName',
    }

    storage.addHandler(handler)

    expect(storage.findHandler(controller.constructor)).toBe(handler)
  })

  it('should save and retrieve routed handler', () => {
    const storage = new ConfigurationStorage()
    const controller = () => {}
    const route = 'getObject'
    const handler: IHandlerConfiguration = {
      type: 'handler',
      object: controller,
      methodName: 'methodName',
      route,
    }

    storage.addHandler(handler)

    expect(storage.findHandler(controller.constructor)).toBeUndefined()
    expect(storage.findHandler(controller.constructor, route)).toBe(handler)
  })
})
