import Vue from 'vue'
import './cube-ui'
import VueRouter from 'vue-router'
import App from './App.vue'
import "./register"

import './common/stylus/index.styl'

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
}).$mount('#app')
