import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCartItems } from '../components/Services/Cart'

const fetchCartItems = async (): Promise<Array<any>> => {
  try {
    const response = await getCartItems()
    const data = response.data
    return data.result as Array<any>
  } catch (error) {
    console.error('Error fetching cart items:', error)
    return []
  }
}
const fetchCartItemsBook = async (id: string): Promise<number> => {
  try {
    const response = await getCartItems()
    const cartItems = response.data.result
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].product_id._id == id) {
        console.log('Quantity to buy:', cartItems[i].quantityToBuy)
        return cartItems[i].quantityToBuy as number
      }
    }
    return 0
  } catch (error) {
    return 0
  }
}

export const useCounterStore = defineStore('counter', {
  state: () => ({
    searchtext: ''
  }),
  actions: {
    setSearchText(newText: string) {
      this.searchtext = newText
      console.log(this.searchtext)
    }
  },
  getters: {
    getSearchText(state) {
      return state.searchtext
    }
  }
})

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: '',
    cartitemscount: 0,
    cartbookcount: 0
  }),
  actions: {
    async setCart(id: string) {
      this.cart = id
    },
    async setCartItemsCount() {
      const cartItems = await fetchCartItems()
      this.cartitemscount = cartItems.length
    },
    async setCartBookCount(id: string) {
      console.log('firing')
      const count = await fetchCartItemsBook(id)
      this.cartbookcount = count
    }
  },
  getters: {
    getCart(): string {
      return this.cart
    },
    getCartItemsCount(): number {
      return this.cartitemscount
    },
    getCartBookCount(): number {
      return this.cartbookcount
    }
  }
})
