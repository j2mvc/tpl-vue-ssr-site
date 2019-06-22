
export default {
    getType({type}){
        return type;
    },
    getInfo(state,getters){
        console.log('on test getInfo.')
        return state.data[getters.getType]

    }
}
