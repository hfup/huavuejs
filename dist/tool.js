"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIp = exports.isUrl = exports.isIdCard = exports.isChinese = exports.isNumOrLetter = exports.isEmail = exports.isNumber = exports.isMobile = void 0;
function isMobile(mobile) {
    return /^1[3-9]\d{9}$/.test(mobile);
}
exports.isMobile = isMobile;
function isNumber(num) {
    return /^\d+$/.test(num);
}
exports.isNumber = isNumber;
function isEmail(email) {
    return /^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(email);
}
exports.isEmail = isEmail;
function isNumOrLetter(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}
exports.isNumOrLetter = isNumOrLetter;
function isChinese(str) {
    return /^[\u4e00-\u9fa5]+$/.test(str);
}
exports.isChinese = isChinese;
function isIdCard(idCard) {
    return /^\d{17}[\dXx]$/.test(idCard);
}
exports.isIdCard = isIdCard;
function isUrl(url) {
    return /^https?:\/\/.+/.test(url);
}
exports.isUrl = isUrl;
function isIp(ip) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
}
exports.isIp = isIp;
