import util from '../../../../lib/util'

export default {
    getError({error}){
        return error;
    },
    getList(state){
        return state.data.list

    }
}
