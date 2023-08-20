import { App } from '@vue/runtime-core';
import type { ConfigOption } from './config';
import { post, get, request } from "./request";
import { readExcel, writeExcel } from "./excel";
export type { M, Dict, OwnerProperty } from "./base";
export type { JsonResult, PaginationOption, RequestMethod, LoginType, RequestOption, LoginResult, LoginOption } from "./request";
export type { WriteExcelDataOption, ExcelHeader, ReadExcelDataOption } from "./excel";
export type { ConfigOption } from "./config";
declare const huavuejs: {
    install(app: App, options: ConfigOption): void;
    post: typeof post;
    get: typeof get;
    request: typeof request;
    readExcel: typeof readExcel;
    writeExcel: typeof writeExcel;
};
export { huavuejs as default, };
