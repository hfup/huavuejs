import { App } from '@vue/runtime-core';
import type { ConfigOption } from './config';
import {setConfig} from "./config";
import {post, get, request} from "./request";

const huavuejs = {
    install(app: App, options:ConfigOption) {
        setConfig(options); // 保存配置
        app.config.globalProperties._post= post;
        app.config.globalProperties._get= get;
        app.config.globalProperties._request=request;
    },
}

export {
    huavuejs as default,
}

