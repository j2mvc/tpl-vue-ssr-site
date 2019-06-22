import {getInfo} from '../../../api'

export default {
    fetchInfo: ({commit}, {type}) => {
        console.log('on test actions fetchInfo ', type);
        return getInfo(type).then(info=>{
            commit('setType', {type} );
            commit('setInfo', {type,info} );
        })
    }
}
