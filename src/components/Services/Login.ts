import {post} from './Axios'

export const login = (data : Object) => {
    return post('bookstore_user/login',data,{})
}

export const signin = (data : Object) =>{
    return post('bookstore_user/registration',data,{})
}