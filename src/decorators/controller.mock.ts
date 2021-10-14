import {
  AppSyncResolverEventController,
  Arguments,
  Detail,
  DetailType,
  EventBridgeEventController,
  Query,
} from '..'

@AppSyncResolverEventController
export class ProductController {
  @Query()
  async getProduct(@Arguments('id') id: string) {
    return id
  }
}

export class Game {
  id: string
  status: string = 'validation'

  setStatus(status: string) {
    this.status = status
  }
}

@EventBridgeEventController
export class GameController {
  @DetailType('GAME_UPDATED')
  async updateGame(@Detail() product: Game) {
    return product
  }

  @DetailType('GAME_PUBLISHED')
  async publishGame(@Detail() product: Game) {
    product.setStatus('published')
    return product
  }
}
