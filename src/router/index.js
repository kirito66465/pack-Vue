import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegister from "../components/pub/LoginAndRegister";
import Index from "../components/pub/Index";
import ForgetPwd from "../components/pub/ForgetPwd";
import AdminHome from "../components/admin/AdminHome";
import UserHome from "../components/user/UserHome";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/loginAndRegister',
      component: LoginAndRegister
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/forgetPwd',
      component: ForgetPwd
    },
    {
      path: '/userHome',
      component: UserHome
    },
    {
      path: '/adminHome',
      component: AdminHome
    }
  ]
})
