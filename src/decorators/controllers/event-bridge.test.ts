import { EventBridgeEvent } from 'aws-lambda'
import { caller } from '../..'
import { ErrorController, mockedErrorHandler } from './event-bridge.mock'

describe('event bridge event controller', () => {
  describe('error handler', () => {
    it('should call error handler', async () => {
      mockedErrorHandler.mockReturnValueOnce(true)
      const event: Partial<EventBridgeEvent<any, any>> = {
        'detail-type': 'TRIGGER',
        detail: {},
      }

      const result = await caller<any, { game: any; type: any }>(
        ErrorController
      )(event)

      expect(mockedErrorHandler).toBeCalled()
      expect(result).toBeTruthy()
    })
  })
})
