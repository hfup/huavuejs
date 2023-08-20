interface ConfigOption {
    api_base_url: string, // api地址
    api_login_path: string, // 登录地址
    login_page_path: string, // 登录页面地址
    debug?: boolean, // 是否开启调试模式
    cacheExpire?: number, // 缓存过期时间
    closeAuth?: boolean, // 是否关闭鉴权 开发环境下可以关闭鉴权 便于调试
}

let config: ConfigOption = {api_base_url: '',api_login_path:'', login_page_path: '', debug: false};

function setConfig(conf: ConfigOption) {
    config = conf;
}

function getConfig() {
    return config;
}

export type {ConfigOption}
export {setConfig, getConfig}