import Vue from "vue";

export default {
    setType:(state,{type})=>{
        state.type = type;
    },
    setInfo : (state, {type,info}) => {
        if(info){
            // 按type为键存入对象
            Vue.set(state.data, type,info)
        }
    }
}
