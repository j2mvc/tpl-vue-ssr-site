

// 查找modules目录下的所有目录js文件
const files = require.context("./modules", true,  /\.js$/)

const modules = {}

/**
 * 读取模块
 * @param ks
 * @param value
 * @param modules
 * @param i
 * @param len
 * @returns {*|{}}
 */
export function getModule(ks,value,modules,i,len){
    modules = modules || {};
    if(i<len){
        if(i == len -1){
            // 最后一层，赋值
            modules[ks[len -1]] = value;
        }else{
            let m = modules[ ks[i]] || {}
            modules[ ks[i]] = m;

            i++

            getModule(ks,value,m,i,len)
        }
    }
    return modules;
}

files.keys().forEach(key => {
    let k = key.replace(/(\.\/|\.js)/g, '').replace(/(\/)$/g,'');
    let ks = k.split('/');
    if(ks.length > 1){
        // 有子模块
        getModule(ks,files(key).default,modules,0,ks.length)
    }else{
        modules[k] = files(key).default
    }
})
/**
 * API调用方法：modules.common.ad.getList
 */
export default modules
