import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import './assets/sass/main.scss'
import 'es6-promise/auto'

// plugin setup
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
