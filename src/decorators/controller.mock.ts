import { AppSyncResolverEventController } from './controller'
import { Query } from './handler'
import { Argument } from './param'

@AppSyncResolverEventController
export class ProductController {
  @Query()
  async getProduct(@Argument('id') id: string) {
    return id
  }
}
