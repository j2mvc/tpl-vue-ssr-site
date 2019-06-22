import Vue from 'vue'
import vuex from 'vuex'

const modules = require('./modules')

Vue.use(vuex)

export function createStore () {

  return new vuex.Store({
    modules
  })
}
