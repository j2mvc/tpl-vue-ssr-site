<template>
  <div class="page">
    <h1>下面是动态获取的内容{{isMobile?'是手机端':'是PC端'}}</h1>
    <div class="error">分类接口错误：{{error}}</div>
    <div v-html="info.html" v-if="info" class="content"></div>
    <div class="cats">
      <div v-for="item in cats" class="list-item" :key="item.id">
        <div>{{item.name}}</div>
      </div>
    </div>

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
  computed:{
    ...mapState({
    }),
   ...mapGetters({
      error:'content/cat/getError',
       cats:'content/cat/getList',
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
