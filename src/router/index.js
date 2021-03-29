import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegister from "../components/pub/LoginAndRegister"
import Index from "../components/pub/Index"
import ForgetPwd from "../components/pub/ForgetPwd"
import AdminHome from "../components/admin/AdminHome"
import UserHome from "../components/user/UserHome"
import UserAllPack from "../components/user/UserAllPack"
import UserIsPick from "../components/user/UserIsPick"
import UserNoPick from "../components/user/UserNoPick"
import AdminAllPack from "../components/admin/AdminAllPack"
import UserSend from "../components/user/UserSend"
import UserSendList from "../components/user/UserSendList"
import UserInfo from "../components/user/UserInfo"
import UserResetPwd from "../components/user/UserResetPwd"
import AdminResetPwd from "../components/admin/AdminResetPwd"
import AdminInfo from "../components/admin/AdminInfo"
import AdminIsPick from "../components/admin/AdminIsPick"
import AdminNoPick from "../components/admin/AdminNoPick"
import AdminShelf from "../components/admin/AdminShelf"
import PackId from "../components/admin/PackId"
import AdminCollection from "../components/admin/AdminCollection"
import AdminEcharts from "../components/admin/AdminEcharts"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login-register',
      component: LoginAndRegister
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/forget-pwd',
      component: ForgetPwd
    },
    {
      path: '/user-home',
      name: 'userHome',
      component: UserHome,
      children: [
        {
          path: '/user-home/all-pack',
          name: 'allPacks',
          component: UserAllPack
        },
        {
          path: '/user-home/is-pack',
          name: 'isPack',
          component: UserIsPick
        },
        {
          path: '/user-home/no-pack',
          name: 'noPack',
          component: UserNoPick
        },
        {
          path: '/user-home/send',
          name: 'send',
          component: UserSend
        },
        {
          path: '/user-home/send-list',
          name: 'sendList',
          component: UserSendList
        },
        {
          path: '/user-home/info',
          name: 'info',
          component: UserInfo
        },
        {
          path: '/user-home/reset-pwd',
          name: 'resetPwd',
          component: UserResetPwd
        }
      ]
    },
    {
      path: '/admin-home',
      name: 'adminHome',
      component: AdminHome,
      children: [
        {
          path: '/admin-home/all-pack',
          name: 'allPacks',
          component: AdminAllPack
        },
        {
          path: '/admin-home/reset-pwd',
          name: 'resetPwd',
          component: AdminResetPwd
        },
        {
          path: '/admin-home/info',
          name: 'info',
          component: AdminInfo
        },
        {
          path: '/admin-home/is-pick',
          name: 'isPick',
          component: AdminIsPick
        },
        {
          path: '/admin-home/no-pick',
          name: 'noPick',
          component: AdminNoPick
        },
        {
          path: '/admin-home/shelf',
          name: 'shelf',
          component: AdminShelf
        },
        {
          path: '/admin-home/pack-id',
          name: 'packId',
          component: PackId
        },
        {
          path: '/admin-home/collection',
          name: 'collection',
          component: AdminCollection
        },
        {
          path: '/admin-home/echarts',
          name: 'echarts',
          component: AdminEcharts
        }
      ]
    }
  ]
})
