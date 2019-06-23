import axios from 'axios'
import api from '../../../../api'

export default {
    fetchList: ({commit}, {type}) => {
        return api.request.get({
                url: '/getCats',
                params:{
                    moduleId:type
                },
                cache:true
            }).then(
                res => {
                    // 返回数据
                    if(res.code == 1){
                        commit('setList', {list:res.data.list} );
                    }else{
                        commit('setError', {code:-1,message:'未获取到Promise'} );
                    }
                }).catch(error => {
                commit('setError', {error} );
            })
    }
}
