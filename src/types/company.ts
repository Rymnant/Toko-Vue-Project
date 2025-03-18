import type { Product } from '@/types/product'

export interface Company {
  id: number
  name: string
  logo?: string
  address?: string
  sector?: string
  rating?: number
  productsSold?: number
  description?: string
  mission?: string
  values?: string[]
  products: Product[]
}
