import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
      {
        path: 'login',
        component: () => import('@/views/LoginLayout.vue'),
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
        component: () => import('@/views/Register.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'edit-profile',
        name: 'editProfile',
        component: () => import('@/views/EditProfile.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes 
})

export default router
