import {
  caller,
  Detail,
  DetailType,
  EventBridgeEventController,
  Initializer,
} from '../..'

export const mockedErrorHandler = jest.fn()

class ErrorService {
  constructor() {
    throw new Error('ErrorService')
  }

  async handle(model: any) {
    throw new Error('service error')
  }
}

class ErrorModel {
  constructor() {
    throw new Error('ErrorModel')
  }
}

@EventBridgeEventController({ errorHandler: mockedErrorHandler })
export class ErrorController {
  errorService: ErrorService

  @Initializer
  async init() {
    this.errorService = new ErrorService()
  }

  @DetailType('TRIGGER')
  async handler(@Detail() model: ErrorModel) {
    const result = await this.errorService.handle(model)
    return result
  }
}
