import { get, post, put, axiosDelete } from './Axios'

export const addCartItems = (id:string) => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    "x-access-token": key
  }
  console.log(`/bookstore_user/add_cart_item/${id}`)
  return post(`/bookstore_user/add_cart_item/${id}`, {}, { headers })
}

export const removeWishItems = (id: String) => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    "x-access-token": key
  }
  return axiosDelete(`/bookstore_user/remove_wishlist_item/${id}`, { headers })
}
export const getWishllistItems = () => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    "x-access-token": key
  }
  return get(`bookstore_user/get_wishlist_items`, { headers })
}
