import { AppSyncResolverEvent, EventBridgeEvent } from 'aws-lambda'
import { caller } from '..'
import { Game, GameController, ProductController } from './controller.mock'

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

  it('should call appsync controller mutation', async () => {
    const id = 'uuid'
    const event: Partial<AppSyncResolverEvent<any>> = {
      info: {
        fieldName: 'createProduct',
      } as any,
      arguments: {
        input: {
          id,
        },
      },
    }

    const result = await caller<any, { game: any; type: any }>(
      ProductController
    )(event)

    expect((result as unknown as { id: string }).id).toBe(id)
  })

  it('should throw error from appsync controller mutation', async () => {
    const event: Partial<AppSyncResolverEvent<any>> = {
      info: {
        fieldName: 'createProduct',
      } as any,
      arguments: {
        input: {},
      },
    }

    const result = caller<any, { game: any; type: any }>(ProductController)(
      event
    )

    await expect(async () => await result).rejects.toThrow()
  })

  it('should create event bridge controller for update', async () => {
    const game = {
      id: 'gameId',
    }
    const event: Partial<EventBridgeEvent<any, any>> = {
      'detail-type': 'GAME_UPDATED',
      detail: game,
    }

    const result = await caller<any, { game: any; type: any }>(GameController)(
      event
    )

    expect(result).toEqual({ ...game, status: 'validation' })
    expect(result).toBeInstanceOf(Game)
  })

  it('should create event bridge controller for publish', async () => {
    const game = {
      id: 'gameId',
    }
    const event: Partial<EventBridgeEvent<any, any>> = {
      'detail-type': 'GAME_PUBLISHED',
      detail: game,
    }

    const result = await caller<any, { game: any; type: any }>(GameController)(
      event
    )

    expect(result).toEqual({ ...game, status: 'published' })
    expect(result).toBeInstanceOf(Game)
  })
})
