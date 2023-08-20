"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = exports.setCache = void 0;
function setCache(key, data, expiresIn) {
    let cacheData = {
        data,
        expire: Date.now() / 1000 + expiresIn
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
}
exports.setCache = setCache;
function getCache(key) {
    let data = localStorage.getItem(key);
    if (data) {
        let cacheData = JSON.parse(data);
        if (cacheData.expire > Date.now() / 1000) {
            return JSON.parse(cacheData.data);
        }
    }
    return null;
}
exports.getCache = getCache;
