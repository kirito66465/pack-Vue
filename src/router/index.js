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
      path: '/loginAndRegister',
      component: LoginAndRegister
    },
    {
      path: '/index',
      name: 'index',
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
          path: '/userHome/send',
          name: 'send',
          component: UserSend
        },
        {
          path: '/userHome/sendList',
          name: 'sendList',
          component: UserSendList
        },
        {
          path: '/userHome/info',
          name: 'info',
          component: UserInfo
        },
        {
          path: '/userHome/resetPwd',
          name: 'resetPwd',
          component: UserResetPwd
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
        },
        {
          path: '/adminHome/resetPwd',
          name: 'resetPwd',
          component: AdminResetPwd
        },
        {
          path: '/adminHome/info',
          name: 'info',
          component: AdminInfo
        },
        {
          path: '/adminHome/isPicks',
          name: 'isPick',
          component: AdminIsPick
        },
        {
          path: '/adminHome/noPicks',
          name: 'noPick',
          component: AdminNoPick
        },
        {
          path: '/adminHome/shelf',
          name: 'shelf',
          component: AdminShelf
        },
        {
          path: '/adminHome/packId',
          name: 'packId',
          component: PackId
        },
        {
          path: '/adminHome/collection',
          name: 'collection',
          component: AdminCollection
        },
        {
          path: '/adminHome/echarts',
          name: 'echarts',
          component: AdminEcharts
        }
      ]
    }
  ]
})
