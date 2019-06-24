<template>
  <div class="page">
    <div class="error">分类接口错误：{{catError}}</div>
    <div class="cats">
        <div v-for="item in cats" class="list-item" :key="item.id">
          <div>{{item.name}}</div>
        </div>
    </div>
  </div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const {mapState,mapActions,mapGetters} = createNamespacedHelpers('content');
export default {
  name:'content-list',
    data(){
      return {
      }
    },
  components: {
  },
  computed:{
    ...mapState({
    }),
   ...mapGetters({
       catError:"cat/getError",
       cats:'cat/getList'
    })
  },
 mounted(){
 },
  methods:{
      ...mapActions({
          getCats:'cat/getList'
      })
  }
}
</script>
