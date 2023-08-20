function isMobile(mobile:string):boolean {
    return /^1[3-9]\d{9}$/.test(mobile)
}

function isNumber(num:string):boolean {
    return /^\d+$/.test(num)
}

function isEmail(email:string):boolean {
    return /^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(email)
}

function isNumOrLetter(str:string):boolean {
    return /^[a-zA-Z0-9]+$/.test(str)
}

function isChinese(str:string):boolean {
    return /^[\u4e00-\u9fa5]+$/.test(str)
}

function isIdCard(idCard:string):boolean {
    return /^\d{17}[\dXx]$/.test(idCard)
}

function isUrl(url:string):boolean {
    return /^https?:\/\/.+/.test(url)
}

function isIp(ip:string):boolean {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip)
}

export {isMobile,isNumber,isEmail,isNumOrLetter,isChinese,isIdCard,isUrl,isIp}