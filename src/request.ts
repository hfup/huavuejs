import type {M} from "./base";
import {getConfig} from "./config";
import {getCache,setCache} from "./cache";
import md5 from "js-md5";
import axios from "axios";

interface JsonResult<T> {
    err_code: number,
    message: string,
    data?: T
}

interface PaginationOption<T> {
    page_size: number,
    page_no: number,
    search_option?:T
}

type RequestMethod = 'GET' | 'POST';
type LoginType = 'account' | 'email' | 'wechat' | 'ali' | 'wechat-corp'

interface RequestOption<T> {
    path: string, // 请求路径
    header?: M<string>, // 请求头
    method?: RequestMethod, // 请求方法
    data?: T, // 请求数据
    isCache?: boolean, // 是否缓存
    needLogin?: boolean, // 是否需要登录鉴权
}

interface LoginResult {
    token: string,
    user_id: string,
    expire: number,
    [key: string]: any // 其他字段
}

interface LoginOption {
    login_type: LoginType,
    account: string,
    password: string,
    [key: string]: any // 其他字段
}

function getBaseUrl(): string {
    let confInfo = getConfig()
    return confInfo.api_base_url
}

async function get<R=any>(path:string):Promise<JsonResult<R>> {
    return request<R>({path})
}

async function post<R=any,Q=any>(path:string,data:Q):Promise<JsonResult<R>> {
    return request<R,Q>({path,method:'POST',data})
}

async function request<R=any,Q=any>(opt:RequestOption<Q>):Promise<JsonResult<R>> {
    let url = opt.path
    if (!url.startsWith("http")) {
        url = getBaseUrl() + url
    }
    let header = opt.header || {}
    let method = opt.method || 'GET'
    let needLogin = opt.needLogin ?? true

    let noAuth =  getConfig().closeAuth ?? false // 是否关闭鉴权 全局配置
    if (noAuth) {
        needLogin = false
    }
    if (opt.data){
        method = 'POST'
    }
    if (needLogin){ // 需要登录鉴权
        try {
            let loginInfo = await checkLogin()
            header['user-id'] = loginInfo.user_id
            header['user-token'] = loginInfo.token
        }catch (e){
            // 跳转登录页面
            window.location.href = getConfig().login_page_path
            return Promise.resolve({err_code: 4001, message: '未登录'})
        }
    }
    return new Promise<JsonResult<R>>((resolve, reject) => {

        let isCache = opt.isCache ?? false
        let cacheKey = getRequestKey(opt)
        if (isCache) {
            let cacheData = getCache<JsonResult<R>>(cacheKey)
            if (cacheData) {
                resolve(cacheData)
                return
            }
        }
        switch (method) {
            case 'GET':
               axios.get(url,{headers:header}).then(res=>{
                   if (res.status === 200) {
                       let respData = res.data as JsonResult<R>
                       if (isCache && respData.err_code === 0) {
                           let cacheExpiresIn = getConfig().cacheExpire ?? 5*60 // 默认缓存5分钟
                           setCache(cacheKey,JSON.stringify(respData),cacheExpiresIn)
                       }
                       resolve(respData)
                       return
                   }
                   reject({err_code: res.status, message: res.statusText})
               })
                break
            case 'POST':
                axios.post(url,opt.data,{headers:header}).then(res=>{
                    if (res.status === 200) {
                        let respData = res.data as JsonResult<R>
                        if (isCache && respData.err_code === 0) {
                            let cacheExpiresIn = getConfig().cacheExpire ?? 5*60 // 默认缓存5分钟
                            setCache(cacheKey,JSON.stringify(respData),cacheExpiresIn)
                        }
                        resolve(respData)
                        return
                    }
                    reject({err_code: res.status, message: res.statusText})
                })
                break
            default:
                reject({err_code: 4000, message: '不支持的请求方法'})
        }
    })
}

async function checkLogin():Promise<LoginResult>{
    return new Promise<LoginResult>((resolve, reject) => {
        let token = localStorage.getItem('user-token')
        if (token) {
            resolve(JSON.parse(token))
        } else {
            reject('未登录')
        }
    })
}

function getRequestKey<T>(opt:RequestOption<T>):string {
    let key = opt.path
    if (opt.data) {
        key += JSON.stringify(opt.data)
    }
    return md5(key)
}

async function login(opt:LoginOption):Promise<JsonResult<LoginResult>> {
    let url = getConfig().api_login_path
    if (!url.startsWith("http")) {
        url = getBaseUrl() + url
    }
    let requestOpt:RequestOption<LoginOption> = {
        path:url,
        data:opt,
        method:"POST",
        needLogin:false
    }
    let resp = await request<LoginResult,LoginOption>(requestOpt)
    if (resp.err_code === 0) {
        localStorage.setItem("user-token",JSON.stringify(resp.data))
    }
    return resp
}

export type {JsonResult,PaginationOption,RequestMethod,LoginType,RequestOption,LoginResult,LoginOption}
export {get,post,request,login}

