"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const config_1 = require("./config");
const request_1 = require("./request");
const excel_1 = require("./excel");
const huavuejs = {
    install(app, options) {
        (0, config_1.setConfig)(options); // 保存配置
        app.config.globalProperties._post = request_1.post;
        app.config.globalProperties._get = request_1.get;
        app.config.globalProperties._request = request_1.request;
    },
    post: request_1.post,
    get: request_1.get,
    request: request_1.request,
    readExcel: excel_1.readExcel,
    writeExcel: excel_1.writeExcel,
};
exports.default = huavuejs;
