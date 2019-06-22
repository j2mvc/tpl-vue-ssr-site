<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>下面是动态获取的内容{{isMobile?'是手机端':'是PC端'}}</h1>
    <div v-html="info.html" v-if="info" class="content"></div>

  </div>
</template>

<script>

import {mapState , mapGetters} from 'vuex'

export default {
  name:'home',
  components: {
  },
  data(){
    return {
      isMobile:true
    }
  },
  asyncData ({ store, route }) {
    // 添加同步数据方法，用于服务器渲染
    // 触发 action 后，会返回 Promise
    console.log('[home asyncData.]')

    return store.dispatch('ssrTest/fetchInfo',{type:'info'})
  },
  computed:{
    ...mapState({
    }),
   ...mapGetters({
       info:'ssrTest/getInfo'
    })

  },
  mounted(){
    this.isMobile = this.$util.isMobile();
  },
  methods:{
  }
}
</script>
