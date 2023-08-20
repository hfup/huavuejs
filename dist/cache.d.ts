interface CacheData {
    data: string;
    expire: number;
}
declare function setCache(key: string, data: string, expiresIn: number): void;
declare function getCache<T>(key: string): T | null;
export type { CacheData };
export { setCache, getCache };
