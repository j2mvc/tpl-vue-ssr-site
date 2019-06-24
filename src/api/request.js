import axios from 'axios'
import {Message} from 'element-ui'
import util from '../lib/util'
import md5 from 'md5'
import config from './config.js'

// 创建一个错误
function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}

// 记录和显示错误
function errorLog(error) {
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        console.log(error)
    }
    // 显示提示
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
}

// 创建一个 axios 实例
const service = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: config.api,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 5000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // 默认值为false
    // `url` 是用于请求的服务器 URL

    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function(params) {
    //     return Qs.stringify(params, {arrayFormat: 'brackets'})
    // },


    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    // adapter: function (config) {
    //     /* ... */
    // },

    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    // responseType: 'json', // 默认的
    // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    // xsrfCookieName: 'XSRF-TOKEN', // default
    // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
    // xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
        // 对原生进度事件的处理
    },

    // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
        // 对原生进度事件的处理
    },

    // `maxContentLength` 定义允许的响应内容的最大尺寸
    // maxContentLength: 2000,

    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
    },

    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5, // 默认的

    // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
    // `keepAlive` 默认没有启用
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),

    // 'proxy' 定义代理服务器的主机名称和端口
    // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
    // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
    // proxy: {
    //     host: 'api.ptjp.gov.cn',
    //     port: 80,
        // auth: {
        //     username: 'mikeymike',
        //     password: 'rapunz3l'
        // }
    // },
    // `cancelToken` 指定用于取消请求的 cancel token
    // cancelToken: new CancelToken(function (cancel) {
    // })
})


// 请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //config.headers['X-Token'] = 'text/plain'
    //config.headers['content-type'] = 'text/plain'
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    let data = response.data
    // 对 data 进行任意转换处理
    // 这个状态码是和后端约定的
    let {code} = data
    // 根据 code 进行判断
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    let message = '';
    if (code == 1) {
        //没有错误
        return data;
    } else if (code == 0) {
        // code == 0 失败
        message = data.message;
        errorCreate(`[ code: 0 ] ${data.message}: ${response.config.url}`)
    } else {
        // 不是正确的 code
        message = '请求失败';
        errorCreate(`未知代码: ${response.config.url}`)
    }
    return {code: -1, message: message};
}, function (error) {
    // 对响应错误做点什么
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误';
                break
            case 401:
                error.message = '未授权，请登录';
                break
            case 403:
                error.message = '拒绝访问';
                break
            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`;
                break
            case 408:
                error.message = '请求超时';
                break
            case 500:
                error.message = '服务器内部错误';
                break
            case 501:
                error.message = '服务未实现';
                break
            case 502:
                error.message = '网关错误';
                break
            case 503:
                error.message = '服务不可用';
                break
            case 504:
                error.message = '网关超时';
                break
            case 505:
                error.message = 'HTTP版本不受支持';
                break
            default:
                break
        }
    }
    // errorLog(error)
    return Promise.reject(error);
});

const apikey = 'myapikey'
// request.get(url,params,true)
// request.post(url,data,false)

export default {

    async get({url,params,cache}){
        // let data = {"code":"1","data":{"list":[{"enableUri":true,"listStyle":"2","sorter":99,"existsChildren":false,"module":{"address":"ptxq","sorter":99,"name":"平塘县情","active":"Y","id":"201412290840356913","enableEdit":"Y"},"name":"典故传说","catType":"1","active":"Y","description":"栏目类型：列表；无管理限制；","id":"201412291033081535","uri":"dgcs","adminLimit":"N"},{"enableUri":true,"listStyle":"2","sorter":99,"existsChildren":false,"module":{"address":"ptxq","sorter":99,"name":"平塘县情","active":"Y","id":"201412290840356913","enableEdit":"Y"},"name":"基本县情","catType":"1","active":"Y","description":"栏目类型：列表；无管理限制；","id":"201412291033345188","uri":"jbxq","adminLimit":"N"}]},"message":"获取数据完成"}
        const key = md5(url + JSON.stringify(params))
        if (config.cached && config.cached.has(key)) {
            return config.cached.get(key)
        }
        // 这会在应用中暴露
        params.apikey = apikey
        return new Promise((resolve, reject) => {
            service({
                method: 'get',
                url: url,
                params,
            }).then(res => {
                if (config.cached && cache)
                    config.cached.set(key, res)
                resolve(res);
            }).catch(function (error) {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                reject(error)
            })
        })
    },
    post({url, data,cache}) {

        const key = md5(url + JSON.stringify(data))
        if (config.cached && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url: url,
                // `data` 是作为请求主体被发送的数据
                // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
                // 在没有设置 `transformRequest` 时，必须是以下类型之一：
                // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
                // - 浏览器专属：FormData, File, Blob
                // - Node 专属： Stream
                data,
                // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
                // auth: {
                //     username: 'janedoe',
                //     password: 's00pers3cret'
                // },
                // 其他配置
            }).then(data => {
                if (config.cached && cache)
                    config.cached.set(key, data)
                resolve(data)
            }).catch(function (error) {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                reject(error)
            });
        });
    }
}

