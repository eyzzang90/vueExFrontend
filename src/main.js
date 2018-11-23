// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Header from './components/layout/Header'
// import Menu from './components/layout/Menu'
import router from './router'
import axios from 'axios'
import './assets/main.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios




/* eslint-disable no-new */
new Vue({
  el: '#content',
  router,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: '#header',
  router,
  components: { Header },
  template: '<Header/>'
})

// new Vue({
//   el: '#menu',
//   router,
//   components: {Menu},
//   template: '<Menu/>'
// })
