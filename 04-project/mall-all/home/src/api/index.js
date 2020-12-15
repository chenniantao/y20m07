var { API_CONFIG, SERVER, VERSION } = require('./config.js')
var _util = require('util')
const getApiObj = (apiConfig) => {
    const apiObj = {}

    for (let key in apiConfig) {
        apiObj[key] = (options) => {
            let version = VERSION
            if (options.version) {
                version = options.version
            }
            //处理请求参数
            let url = apiConfig[key][0] || ''

            if (version) {
                url = '/' + version + url
            }

            if (!url.startsWith('http://') && SERVER) {
                url = SERVER + url
            }
            let method = apiConfig[key][1] || 'get'
            return request({
                url: url,
                method: method,
                data: options.data,
                success: options.success,
                error: options.error,
                params: options.params//其他特殊的配置
            })
        }
    }

    return apiObj
}

const request = (options) => {
    let params = {}
    if (options.params) {
        params = options.params
    }
    $.ajax({
        url: options.url,
        method: options.method,
        data: options.data,
        dataType: 'json',
        xhrFields: { withCredentials: true },
        ...params,
        success: function (result) {
            if (result.code == 0) {
                options.success && options.success(result.data)
            }
            else if (result.code == 1) {
                options.error && options.error(result.message)
            }
            else if (result.code == 10) {
                _util.goLogin()
            } else if (!result.code) {
                options.success && options.success(result)
            }
        },
        error: function (err) {
            options.error && options.error('网络错误,请稍后再试')
        }
    })
}


module.exports = getApiObj(API_CONFIG)