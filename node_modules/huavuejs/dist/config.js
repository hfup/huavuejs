"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.setConfig = void 0;
let config = { api_base_url: '', api_login_path: '', login_page_path: '', debug: false };
function setConfig(conf) {
    config = conf;
}
exports.setConfig = setConfig;
function getConfig() {
    return config;
}
exports.getConfig = getConfig;
