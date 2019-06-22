
import api from '../../../api'

export default {
    fetchInfo: ({commit}, {type}) => {
        console.log('on test actions fetchInfo api ');
        return api.modules.test.getInfo(type).then(info=>{
            commit('setType', {type} );
            commit('setInfo', {type,info} );
        })
    }
}
