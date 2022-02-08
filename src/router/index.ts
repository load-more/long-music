import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useMainStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      // vite Server.Proxy does not work because of nested routes
      {
        path: 'login',
        component: () => import('@/views/LoginLayout.vue'),
        meta: {
          requiresLogout: true
        },
        children: [
          {
            path: '', // 注意，子路由不能带上 / ，否则无法显示路由
            name: 'phone',
            component: () => import('@/views/PhoneLogin.vue')
          },
          {
            path: 'sms',
            name: 'sms',
            component: () => import('@/views/SmsLogin.vue')
          },
          {
            path: 'email',
            name: 'email',
            component: () => import('@/views/EmailLogin.vue')
          },
          {
            path: 'qrcode',
            name: 'qrcode',
            component: () => import('@/views/QrcodeLogin.vue')
          },
        ]
      },
      {
        path: 'register',
        name: 'register',
        meta: {
          requiresLogout: true
        },
        component: () => import('@/views/Register.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        meta: {
          requiresLogin: true
        },
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'edit-profile',
        name: 'editProfile',
        meta: {
          requiresLogin: true
        },
        component: () => import('@/views/EditProfile.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes 
})

// const checkCookie = (cName: string) => {
//   const cookie = document.cookie
//   const arr = cookie.split('; ')
//   return !!arr.find(item => item.split('=')[0] === cName)
// }

router.beforeEach(async (to, from) => {
  // const cName = 'MUSIC_U'
  // const isLogin = checkCookie(cName)
  const { isLogin } = storeToRefs(useMainStore())
  if (to.meta.requiresLogin && !isLogin.value) {
    // 如果路由需要登录且用户未登录，则跳转到登录页
    return { name: 'phone' }
  }
  if (to.meta.requiresLogout && isLogin.value) {
    // 如果路由需要登出且用户已登录，则停止跳转
    return { path: from.path }
  }
})

export default router
