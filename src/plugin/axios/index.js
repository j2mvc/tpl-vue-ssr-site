import store from '@/store'
import axios from 'axios'
import {Message} from 'element-ui'
import util from '@/libs/util'

// 创建一个错误
function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}

// 记录和显示错误
function errorLog(error) {
    // 添加到日志
    store.dispatch('d2admin/log/push', {
        message: '数据请求异常',
        type: 'danger',
        meta: {
            error
        }
    })
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
    baseURL: process.env.VUE_APP_API,
    timeout: 5000, // 请求超时时间
    withCredentials: true
})
// 请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    const data = response.data;
    // 这个状态码是和后端约定的
    const {code} = data
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
    errorLog(error)
    return Promise.reject(error);
});

export default service
