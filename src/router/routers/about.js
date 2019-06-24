import util from '../../lib/util'

export function getView() {
    if(util.isMobile())
        return require('../../views/mobile/About.vue');
    return require('../../views/pc/About.vue');
}

// 这是一个用于动态创建视图的工厂函数，
// 它们本质上是包装*.vue的高阶组件。
export function createView () {
    return {
        name: `home-stories-view`,
        title: '关于',

        render (h) {
            return h(getView())
        }
    }
}
export default {
    path: '/about',
    name: 'about',
    component: createView ()
}
