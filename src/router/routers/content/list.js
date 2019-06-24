const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

const type = '201412290840356913'

export function getView() {
    const util = require('../../../lib/util');
    if(util.isMobile())
        return require('../../../views/mobile/content/List.vue');
    return require('../../../views/pc/content/List.vue');
}

// 这是一个用于动态创建视图的工厂函数，
// 它们本质上是包装*.vue的高阶组件。
export function createView () {
    return {
        name: `content-list-stories-view`,

        asyncData ({ store , route}) {
            return Promise.all([
                store.dispatch('content/cat/fetchList', { type:'201412290840356913' })
             ])
        },

        title: camelize(type),

        computed:{
            view :getView()
        },

        render (h) {
            return h(this.view)
        }
    }
}

export default {
    path: '/content/list',
    name: 'content-list',
    component:createView()
}
