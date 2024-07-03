import { get, post, put, axiosDelete } from './Axios'

export const addCartItems = (id:string) => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    "x-access-token": key
  }
  console.log(`/bookstore_user/add_cart_item/${id}`)
  return post(`/bookstore_user/add_cart_item/${id}`, {}, { headers })
}
export const cartitemQuantity = (id: String, data: object) => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    "x-access-token": key
  }
  return put(`/bookstore_user/cart_item_quantity/${id}`, data, { headers })
}
export const removeCartItems = (id: String) => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    "x-access-token": key
  }
  return axiosDelete(`/bookstore_user/remove_cart_item/${id}`, { headers })
}
export const getCartItems = () => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    "x-access-token": key
  }
  return get(`/bookstore_user/get_cart_items`, { headers })
}
