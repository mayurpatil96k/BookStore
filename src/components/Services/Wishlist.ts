import { get, post, put, axiosDelete } from './Axios'

export const addWishlist = (id: string) => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    'x-access-token': key
  }
  return post(
    `/bookstore_user/add_wish_list/${id}`,
    {},
    { headers }
  )
}

export const removeWishItems = (id: String) => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    'x-access-token': key
  }
  return axiosDelete(`/bookstore_user/remove_wishlist_item/${id}`, { headers })
}
export const getWishllistItems = () => {
  const key = localStorage.getItem('API_KEY')
  const headers = {
    'x-access-token': key
  }
  return get(`bookstore_user/get_wishlist_items`, { headers })
}
