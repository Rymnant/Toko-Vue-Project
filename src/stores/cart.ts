import { defineStore } from 'pinia'
import type { Product } from '@/types/product'
import type { CartItem } from '@/types/cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.product.price * item.quantity, 0),

    isInCart: (state) => (productId: number) => {
      return state.items.some((item) => item.product.id === productId)
    },

    getQuantity: (state) => (productId: number) => {
      const item = state.items.find((item) => item.product.id === productId)
      return item ? item.quantity : 0
    },
  },

  actions: {
    addItem(product: Product) {
      try {
        if (!product || typeof product.id !== 'number') {
          throw new Error('Invalid product data')
        }

        const existingItem = this.items.find((item) => item.product.id === product.id)

        if (existingItem) {
          existingItem.quantity++
        } else {
          this.items.push({
            product,
            quantity: 1,
          })
        }

        // Tambahin notifikasi disini
        console.log(`Added ${product.name} to cart`)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to add item to cart'
        console.error(this.error)
        throw error // Re-throw buat nge-handle error di komponen
      }
    },

    removeItem(productId: number) {
      try {
        const index = this.items.findIndex((item) => item.product.id === productId)
        if (index !== -1) {
          this.items.splice(index, 1)
        } else {
          throw new Error('Product not found in cart')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to remove item from cart'
        console.error(this.error)
      }
    },

    updateQuantity(productId: number, quantity: number) {
      try {
        if (quantity < 1) {
          return this.removeItem(productId)
        }

        const item = this.items.find((item) => item.product.id === productId)
        if (item) {
          item.quantity = quantity
        } else {
          throw new Error('Product not found in cart')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update quantity'
        console.error(this.error)
      }
    },

    clearCart() {
      this.items = []
    },
  },
})
