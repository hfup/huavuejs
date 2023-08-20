import { App } from '@vue/runtime-core';
import type { ConfigOption } from './config';
import {setConfig} from "./config";
import {post, get, request} from "./request";
import {readExcel,writeExcel} from "./excel";

export  type {M,Dict,OwnerProperty} from "./base";
export  type {JsonResult,PaginationOption,RequestMethod,LoginType,RequestOption,LoginResult,LoginOption} from "./request";
export  type {WriteExcelDataOption,ExcelHeader,ReadExcelDataOption} from "./excel";
export  type {ConfigOption} from "./config";
export  type {PaginationHook} from "./hook/pagination";

const huavuejs = {
    install(app: App, options:ConfigOption) {
        setConfig(options); // 保存配置
        app.config.globalProperties._post= post;
        app.config.globalProperties._get= get;
        app.config.globalProperties._request=request;
    },
    post: post,
    get: get,
    request: request,
    readExcel: readExcel,
    writeExcel: writeExcel,
}

export {
    huavuejs as default,
}

