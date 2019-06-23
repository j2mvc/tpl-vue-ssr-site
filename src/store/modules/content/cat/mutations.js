import Vue from "vue";

export default {
    setError:(state,{error})=>{
        state.error = error;
    },
    setList : (state, {list}) => {
        state.data.list = list
    }
}
