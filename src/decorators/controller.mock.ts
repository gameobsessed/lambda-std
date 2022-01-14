import * as Joi from 'joi'
import {
  AppSyncResolverEventController,
  Arguments,
  Detail,
  DetailType,
  EventBridgeEventController,
  Initializer,
  Mutation,
  Query,
  S3EventController,
  Validator,
  Event,
  EventRecord,
} from '..'

const productInputSchema = Joi.object({
  id: Joi.string().required(),
})

@Validator((input: any) =>
  productInputSchema.validateAsync(input, {
    abortEarly: false,
    stripUnknown: true,
  })
)
export class ProductInput {
  id: string
}

@AppSyncResolverEventController()
export class ProductController {
  @Query()
  async getProduct(@Arguments('id') id: string) {
    return id
  }

  @Mutation()
  async createProduct(@Arguments('input') input: ProductInput) {
    return input
  }
}

export class Game {
  id: string
  status: string = 'validation'

  setStatus(status: string) {
    this.status = status
  }
}

@EventBridgeEventController()
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

@S3EventController()
export class ImageController {
  @Event('ObjectCreated:Copy', 'ObjectCreated:Put')
  async createImage(@EventRecord() record: any) {
    return record
  }
}
