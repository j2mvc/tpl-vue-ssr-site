import cookies from './util.cookies'
import log from './util.log'

const util = {
    cookies,
    log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
    const processTitle = process.env.VUE_APP_TITLE || 'VUE SSR 网站模板'
    window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', '_blank')
    a.setAttribute('id', 'SSIPAdmin-link-temp')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('site-link-temp'))
}
/**
 * @description 生成时间戳ID
 */
util.createId = function(){
    var t = new Date().getTime();
    var r = Math.abs(Math.floor(Math.random() * (1001 - 9999))) ;
    return t+''+r;
}
util.isMobile = function () {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
}

/**
 * 判断环境输出日志
 */
util.logger = function (...text) {
    if(process.env.NODE_ENV === 'development'){
        console.log(...text)
    }
}
export default util
