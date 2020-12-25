// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

axios.defaults.withCredentials = false
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)

const state = {
  adminCard: '',
  adminName: '',
  adminPhone: '',
  adminAddr: '',
  adminCount: 0,
  userCard: '',
  userName: '',
  userPhone: '',
  userAddr: '',
  userCount: 0
}
const mutations = {
  setStore(state) {
    state.adminName = ''
    state.adminCard = ''
    state.adminPhone = ''
    state.adminAddr = ''
    state.adminCount = 0
    state.userName = ''
    state.userCard = ''
    state.userPhone = ''
    state.userAddr = ''
    state.userCount = 0
  },
  setAdminName(state, adminName) {
    state.adminName = adminName
  },
  setAdminCard(state, adminCard) {
    state.adminCard = adminCard
  },
  setAdminPhone(state, adminPhone) {
    state.adminPhone = adminPhone
  },
  setAdminAddr(state, adminAddr) {
    state.adminAddr = adminAddr
  },
  setAdminCount(state, adminCount) {
    state.adminCount = adminCount
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setUserCard(state, userCard) {
    state.userCard = userCard
  },
  setUserPhone(state, userPhone) {
    state.userPhone = userPhone
  },
  setUserAddr(state, userAddr) {
    state.userAddr = userAddr
  },
  setUserCount(state, userCount) {
    state.userCount = userCount
  }
}
const actions = {
  setStore(context) {
    context.commit("setStore")
  },
  setAdminName(context, adminName) {
    context.commit("setAdminName", adminName)
  },
  setAdminCard(context, adminCard) {
    context.commit("setAdminCard", adminCard)
  },
  setAdminPhone(context, adminPhone) {
    context.commit("setAdminPhone", adminPhone)
  },
  setAdminAddr(context, adminAddr) {
    context.commit("setAdminAddr", adminAddr)
  },
  setAdminCount(context, adminCount) {
    context.commit("setAdminCount", adminCount)
  },
  setUserName(context, userName) {
    context.commit("setUserName", userName)
  },
  setUserCard(context, userCard) {
    context.commit("setUserCard", userCard)
  },
  setUserPhone(context, userPhone) {
    context.commit("setUserPhone", userPhone)
  },
  setUserAddr(context, userAddr) {
    context.commit("setUserAddr", userAddr)
  },
  setUserCount(context, userCount) {
    context.commit("setUserCount", userCount)
  }
}
// 创建Store实例
const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store

Vue.prototype.$store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
