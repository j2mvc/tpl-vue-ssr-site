import axios from 'axios'
// import api from '../../../../api'

export default {
    fetchList: ({commit}, {type}) => {

        let url = `/api/getCats?apikey=66bb75d01825f4e06963dd645d901bbe&moduleId=201412290840356913`
        return axios.get(url)
            .then((res) => {
                // 返回数据
                if(res.data.code == 1){
                    commit('setList', {list:res.data.data.list} );
                }else{
                    commit('setError', {code:-1,message:'未获取到Promise'} );
                }
            })
            .catch((e) => {
                commit('setError', {e} );
            });
        // return api.request.get({
        //         url: '/getCats',
        //         params:{
        //             moduleId:type
        //         },
        //         cache:true
        //     }).then(
        //         res => {
        //             // 返回数据
        //             if(res.code == 1){
        //                 commit('setList', {list:res.data.list} );
        //             }else{
        //                 commit('setError', {code:-1,message:'未获取到Promise'} );
        //             }
        //         }).catch(error => {
        //         commit('setError', {error} );
        //     })
    }
}
