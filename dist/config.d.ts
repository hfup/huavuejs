interface ConfigOption {
    api_base_url: string;
    api_login_path: string;
    login_page_path: string;
    debug?: boolean;
    cacheExpire?: number;
    closeAuth?: boolean;
}
declare function setConfig(conf: ConfigOption): void;
declare function getConfig(): ConfigOption;
export type { ConfigOption };
export { setConfig, getConfig };
