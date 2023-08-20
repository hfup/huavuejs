
interface CacheData {
    data:string,
    expire:number
}

function setCache(key:string,data:string,expiresIn:number){
    let cacheData:CacheData = {
        data,
        expire:Date.now() / 1000 + expiresIn
    }
    localStorage.setItem(key,JSON.stringify(cacheData))
}

function getCache<T>(key:string):T|null{
    let data = localStorage.getItem(key)
    if (data) {
        let cacheData = JSON.parse(data) as CacheData
        if (cacheData.expire > Date.now() / 1000) {
            return JSON.parse(cacheData.data) as T
        }
    }
    return null
}


export type {CacheData}
export {setCache,getCache}