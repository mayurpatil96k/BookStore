
import { get,post } from './Axios'

export const getBooks = () => {
  return get('bookstore_user/get/book', {})
}

export const getFeedback = (id: string) => {
  const key = localStorage.getItem('API_KEY')
  console.log(key);
  const headers = {
    'x-access-token': key 
  };
  console.log(`bookstore_user/get/feedback/${id}`)
  return get(`bookstore_user/get/feedback/${id}`, { headers })
}

export const setFeedback = (id: string, feed: Object)=>{
  const key = localStorage.getItem('API_KEY')
  console.log(key);
  const headers = {
    'x-access-token': key 
  };
  return post(`bookstore_user/add/feedback/${id}`,feed, { headers })
}