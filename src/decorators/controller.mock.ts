import { AppSyncResolverEventController } from './controller'
import { Query } from './handler'
import { Arguments } from './param'

@AppSyncResolverEventController
export class ProductController {
  @Query()
  async getProduct(@Arguments('id') id: string) {
    return id
  }
}
