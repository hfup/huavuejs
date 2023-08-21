import { App } from '@vue/runtime-core';
import type { ConfigOption } from './config';
import {setConfig} from "./config";
import {post, get, request} from "./request";
import {usePagination} from "./hook/pagination";
import {writeExcel,readExcel} from "./excel";
import {getCache,setCache} from "./cache";
import tool from "./tool";

const huawebjs = {
    install(app: App, options:ConfigOption) {
        setConfig(options); // 保存配置
        app.config.globalProperties._post= post;
        app.config.globalProperties._get= get;
        app.config.globalProperties._request=request;
    },
    post:post,
    get:get,
    request:request,
    usePagination:usePagination,
    writeExcel:writeExcel,
    readExcel:readExcel,
    tool:tool,
    getCache:getCache,
    setCache:setCache,
}
export {
    huawebjs as default,
    post,
    get,
    request,
    usePagination,
    writeExcel,
    readExcel,
    tool,
    getCache,
    setCache,
}




