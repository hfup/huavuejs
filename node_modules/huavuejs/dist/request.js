"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.request = exports.post = exports.get = void 0;
const config_1 = require("./config");
const cache_1 = require("./cache");
const js_md5_1 = __importDefault(require("js-md5"));
const axios_1 = __importDefault(require("axios"));
function getBaseUrl() {
    let confInfo = (0, config_1.getConfig)();
    return confInfo.api_base_url;
}
async function get(path) {
    return request({ path });
}
exports.get = get;
async function post(path, data) {
    return request({ path, method: 'POST', data });
}
exports.post = post;
async function request(opt) {
    let url = opt.path;
    if (!url.startsWith("http")) {
        url = getBaseUrl() + url;
    }
    let header = opt.header || {};
    let method = opt.method || 'GET';
    let needLogin = opt.needLogin ?? true;
    let noAuth = (0, config_1.getConfig)().closeAuth ?? false; // 是否关闭鉴权 全局配置
    if (noAuth) {
        needLogin = false;
    }
    if (opt.data) {
        method = 'POST';
    }
    if (needLogin) { // 需要登录鉴权
        try {
            let loginInfo = await checkLogin();
            header['user-id'] = loginInfo.user_id;
            header['user-token'] = loginInfo.token;
        }
        catch (e) {
            // 跳转登录页面
            window.location.href = (0, config_1.getConfig)().login_page_path;
            return Promise.resolve({ err_code: 4001, message: '未登录' });
        }
    }
    return new Promise((resolve, reject) => {
        let isCache = opt.isCache ?? false;
        let cacheKey = getRequestKey(opt);
        if (isCache) {
            let cacheData = (0, cache_1.getCache)(cacheKey);
            if (cacheData) {
                resolve(cacheData);
                return;
            }
        }
        switch (method) {
            case 'GET':
                axios_1.default.get(url, { headers: header }).then(res => {
                    if (res.status === 200) {
                        let respData = res.data;
                        if (isCache && respData.err_code === 0) {
                            let cacheExpiresIn = (0, config_1.getConfig)().cacheExpire ?? 5 * 60; // 默认缓存5分钟
                            (0, cache_1.setCache)(cacheKey, JSON.stringify(respData), cacheExpiresIn);
                        }
                        resolve(respData);
                        return;
                    }
                    reject({ err_code: res.status, message: res.statusText });
                });
                break;
            case 'POST':
                axios_1.default.post(url, opt.data, { headers: header }).then(res => {
                    if (res.status === 200) {
                        let respData = res.data;
                        if (isCache && respData.err_code === 0) {
                            let cacheExpiresIn = (0, config_1.getConfig)().cacheExpire ?? 5 * 60; // 默认缓存5分钟
                            (0, cache_1.setCache)(cacheKey, JSON.stringify(respData), cacheExpiresIn);
                        }
                        resolve(respData);
                        return;
                    }
                    reject({ err_code: res.status, message: res.statusText });
                });
                break;
            default:
                reject({ err_code: 4000, message: '不支持的请求方法' });
        }
    });
}
exports.request = request;
async function checkLogin() {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('user-token');
        if (token) {
            resolve(JSON.parse(token));
        }
        else {
            reject('未登录');
        }
    });
}
function getRequestKey(opt) {
    let key = opt.path;
    if (opt.data) {
        key += JSON.stringify(opt.data);
    }
    return (0, js_md5_1.default)(key);
}
async function login(opt) {
    let url = (0, config_1.getConfig)().api_login_path;
    if (!url.startsWith("http")) {
        url = getBaseUrl() + url;
    }
    let requestOpt = {
        path: url,
        data: opt,
        method: "POST",
        needLogin: false
    };
    let resp = await request(requestOpt);
    if (resp.err_code === 0) {
        localStorage.setItem("user-token", JSON.stringify(resp.data));
    }
    return resp;
}
exports.login = login;
