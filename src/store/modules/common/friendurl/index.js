
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
    namespaced:true,
    state: {
        type:'',
        data:{list:{}}
    },
    getters,
    mutations,
    actions
}
