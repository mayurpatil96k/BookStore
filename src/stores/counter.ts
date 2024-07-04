import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getCartItems,
  addCartItems,
  removeCartItems,
  cartitemQuantity
} from '../components/Services/Cart'

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

const fetchCart = async (id: string): Promise<{ cartid: any; cartbookid: any } | number> => {
  try {
    const response = await getCartItems()
    console.log('fetchcart')
    const cartItems = response.data.result
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].product_id._id == id) {
        console.log(cartItems[i]._id)
        return {
          cartid: cartItems[i]._id,
          cartbookid: cartItems[i].product_id._id
        }
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
    cart: [] as any,
    cartitemscount: 0,
    cartbookcount: 0,
    cartobj: {
      cartid: '',
      cartbookid: ''
    }
  }),
  actions: {
    async addtocart() {
      this.cartbookcount++
      await addCartItems(this.cartobj.cartbookid)
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
      this.setCartItemsCount()
    },
    async removefromcart() {
      await removeCartItems(this.cartobj.cartid)
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
      this.setCartItemsCount()
    },
    async removefromcartid(id:number) {
      await removeCartItems(id as unknown as string)
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
      this.setCartItemsCount()
    },
    async updatecartitem() {
      const updateobj = {
        quantityToBuy: this.cartbookcount
      }
      await cartitemQuantity(this.cartobj.cartid, updateobj)
    },
    async updatecartitemid(id:number,quantity:number) {
      const updateobj = {
        quantityToBuy: quantity
      }
      await cartitemQuantity(id as unknown as string, updateobj)
    },
    increment() {
      this.cartbookcount++
      this.updatecartitem()
    },
    incrementid(id:number,qty:number){
      this.updatecartitemid(id,qty);
      this.setCart();
    },
    decrementid(id:number){
      this.removefromcartid(id);
      this.setCart();
    },
    decrement() {
      this.cartbookcount--
      if (this.cartbookcount > 0) {
        this.updatecartitem()
      } else {
        this.removefromcart()
        this.setCartItemsCount()
      }
    },
    async setCart() {
      const cartItems = await fetchCartItems()
      this.cart = cartItems
    },
    async setCartItemsCount() {
      const cartItems = await fetchCartItems()
      this.cartitemscount = cartItems.length
    },
    async setCartBookCount(id: string) {
      this.cartobj.cartbookid = id
      const count = await fetchCartItemsBook(id)
      this.cartbookcount = count
      if (count > 0) {
        fetchCart(id).then((data) => {
          console.log(data)
          this.cartobj.cartid = data.cartid
          this.cartobj.cartbookid = data.cartbookid
        })
      }
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
