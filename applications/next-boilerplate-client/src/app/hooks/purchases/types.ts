import type { Product } from '../products/types'
import type { User } from '../users/types'

export interface Purchase {
  id: string
  date: string
  user: User
  product: Product
}
