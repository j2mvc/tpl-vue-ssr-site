import Vue from 'vue'
import Router from 'vue-router'
import {getModule} from "../store/modules";

Vue.use(Router)

const files = require.context("./routers", true,  /\.js$/)
const routes = []
files.keys().forEach(key => {
  routes.push(files(key).default)
})

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    routes
  })
}
