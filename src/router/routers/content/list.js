import pcList from '../../../views/pc/content/List.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

const type = '201412290840356913'

export function getView() {
    return pcList;
}

export function fetchCats(store,moduleId) {
    store.dispatch('content/cat/fetchList', { type })
}
// 这是一个用于动态创建视图的工厂函数，
// 它们本质上是包装*.vue的高阶组件。
export function createView () {
    return {
        name: `content-list-stories-view`,

        asyncData ({ store , route}) {
            console.log('list-stories-view asyncData.')
            //fetchCats(store,'201412290840356913')
            return Promise.all([
                store.dispatch('content/cat/fetchList', { type:'201412290840356913' })
             ])
        },

        title: camelize(type),

        render (h) {
            return h(getView())
        }
    }
}

export default {
    path: '/content/list',
    name: 'content-list',
    component:createView()
}
