import { AppSyncResolverEvent } from 'aws-lambda'
import { caller } from '..'
import { ProductController } from './controller.mock'

describe('controller', () => {
  it('should create appsync controller', async () => {
    const id = 'uuid'
    const event: Partial<AppSyncResolverEvent<any>> = {
      info: {
        fieldName: 'getProduct',
      } as any,
      arguments: {
        id,
      },
    }

    const result = await caller<any, { game: any; type: any }>(
      ProductController
    )(event)

    expect(result).toBe(id)
  })
})
