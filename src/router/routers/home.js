import view from '../../views/Home.vue'

export function getView() {
    return view;
}

// 这是一个用于动态创建视图的工厂函数，
// 它们本质上是包装*.vue的高阶组件。
export function createView () {
    return {
        name: `home-stories-view`,

        asyncData ({ store, route }) {
            // 添加同步数据方法，用于服务器渲染
            // 触发 action 后，会返回 Promise
            console.log('[home asyncData.]')
            return Promise.all([
                store.dispatch('content/cat/fetchList', { type:'201412290840356913' }),
                store.dispatch('ssrTest/fetchInfo',{type:'info'})
            ])
        },

        title: '首页',

        render (h) {
            return h(getView())
        }
    }
}

export default {
    path: '/',
    name: 'home',
    component: createView ()
}
