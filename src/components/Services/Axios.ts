import axios from "axios";

let BASE_URL = 'https://bookstore.incubation.bridgelabz.com/';

export const post = (url : string,data : Object,headerConfig : Object) => {
    return axios.post(BASE_URL+url,data,headerConfig)
}
export const get = (url : string , headerConfig : Object) => {
    return axios.get(BASE_URL + url, headerConfig);
}
export const gelete = (url : string, headerConfig : Object) => {
    return axios.delete(BASE_URL + url, headerConfig);
};

export const put = (url : string, data : Object, headerConfig : Object) => {
    return axios.put(BASE_URL + url, data, headerConfig);
};

export const patch = (url  : string, data : Object, headerConfig : Object) => {
    return axios.patch(BASE_URL + url, data, headerConfig);
};
