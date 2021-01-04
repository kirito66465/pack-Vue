import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegister from "../components/pub/LoginAndRegister";
import Index from "../components/pub/Index";
import ForgetPwd from "../components/pub/ForgetPwd";
import AdminHome from "../components/admin/AdminHome";
import UserHome from "../components/user/UserHome";
import UserAllPack from "../components/user/UserAllPack";
import UserIsPick from "../components/user/UserIsPick";
import UserNoPick from "../components/user/UserNoPick";
import AdminAllPack from "../components/admin/AdminAllPack";
import UserSend from "../components/user/UserSend";


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
      name: 'userHome',
      component: UserHome,
      children: [
        {
          path: '/userHome/allPacks',
          name: 'allPacks',
          component: UserAllPack
        },
        {
          path: '/userHome/isPacks',
          name: 'isPack',
          component: UserIsPick
        },
        {
          path: '/userHome/noPacks',
          name: 'noPack',
          component: UserNoPick
        },
        {
          path: '/userHome/userSend',
          name: 'userSend',
          component: UserSend
        }
      ]
    },
    {
      path: '/adminHome',
      name: 'adminHome',
      component: AdminHome,
      children: [
        {
          path: '/adminHome/allPacks',
          name: 'allPacks',
          component: AdminAllPack
        }
      ]
    }
  ]
})
