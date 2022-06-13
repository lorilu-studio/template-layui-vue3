import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import {layer} from '@layui/layui-vue';
import router from '../router'

type TAxiosOption = {
    timeout: number;
    baseURL: string;
}
 
const config = {
    timeout: 5000,
    baseURL: "http://localhost:8080"
}
 
class Http {

    service;
    constructor(config: TAxiosOption) {
        this.service = axios.create(config)
        /* 请求拦截 */
        this.service.interceptors.request.use((config: AxiosRequestConfig) => {
            console.log(config)
            if (localStorage.getItem('token')) {
                (config.headers as AxiosRequestHeaders).token = localStorage.getItem('token') as string
            } else {
                if(router.currentRoute.value.path!=='/login') {
                    // 没token跳登录页
                    console.log(router.currentRoute.value.path)
                    router.push('login');
                }
            }
            return config
        }, error => {
            console.log("error");
            return Promise.reject(error);
        })

        /* 响应拦截 */
        this.service.interceptors.response.use((response: AxiosResponse<any>) => {
            const data = response.data
            // 错误处理 to do
            switch (data.code) {
                case 200:
                    return response.data;
                case 500: 
                    layer.msg(response.data.msg, { icon : 2, time: 1000})
                    break;
                default:
                    break;
            }
        }, error => {
            return Promise.reject(error)
        })
    }

    /* GET 方法 */
    get<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.get(url, { params, ..._object })
    }
    /* POST 方法 */
    post<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.post(url, params, _object)
    }
    /* PUT 方法 */
    put<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.put(url, params, _object)
    }
    /* DELETE 方法 */
    delete<T>(url: string, params?: any, _object = {}): Promise<any> {
        return this.service.delete(url, { params, ..._object })
    }
}

export default new Http(config)