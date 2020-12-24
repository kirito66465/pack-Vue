// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
// import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

axios.defaults.withCredentials = false
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueRouter)
Vue.use(ElementUI)

// // KeyCloak设置
// Vue.use(VueKeyCloak)
// Vue.use(VueKeyCloak, [options])
// Vue.use(VueKeyCloak, {
//   init: {
//     onload: 'login-required'
//   },
//   config: {
//     url: 'http://localhost:8080/auth',
//     realm: 'test',
//     clientId: 'test-realm'
//   },
//   onReady: (keycloak) => {
//     keycloak.loadUserProfile().success((data) => {
//       requestAuth;
//       console.log(data);
//     });
//   }
// })
// config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
