import type { M } from "./base";
interface JsonResult<T> {
    err_code: number;
    message: string;
    data?: T;
}
interface PaginationOption<T> {
    page_size: number;
    page_no: number;
    search_option?: T;
}
type RequestMethod = 'GET' | 'POST';
type LoginType = 'account' | 'email' | 'wechat' | 'ali' | 'wechat-corp';
interface RequestOption<T> {
    path: string;
    header?: M<string>;
    method?: RequestMethod;
    data?: T;
    isCache?: boolean;
    needLogin?: boolean;
}
interface LoginResult {
    token: string;
    user_id: string;
    expire: number;
    [key: string]: any;
}
interface LoginOption {
    login_type: LoginType;
    account: string;
    password: string;
    [key: string]: any;
}
declare function get<R = any>(path: string): Promise<JsonResult<R>>;
declare function post<R = any, Q = any>(path: string, data: Q): Promise<JsonResult<R>>;
declare function request<R = any, Q = any>(opt: RequestOption<Q>): Promise<JsonResult<R>>;
declare function login(opt: LoginOption): Promise<JsonResult<LoginResult>>;
export type { JsonResult, PaginationOption, RequestMethod, LoginType, RequestOption, LoginResult, LoginOption };
export { get, post, request, login };
