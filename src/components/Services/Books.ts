import {get} from './Axios'

export const getBooks=()=>{
    return get('bookstore_user/get/book',{});
}