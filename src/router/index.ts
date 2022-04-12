import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'
import { getMusicDetail } from '@/api/music'
import { getPlaylistAllSongs } from '@/api/playlist'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/LayoutPage.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: 'profile/:id?', // 注意，子路由不能带上 / ，否则无法显示路由
        name: 'profile',
        component: () => import('@/views/ProfilePage.vue'),
      },
      {
        path: 'edit-profile',
        name: 'editProfile',
        component: () => import('@/views/ProfileEditPage.vue'),
      },
      {
        path: 'playlist/:id',
        name: 'playlist',
        component: () => import('@/views/PlaylistPage.vue'),
      },
      {
        path: 'edit-playlist/:id',
        name: 'editPlaylist',
        component: () => import('@/views/PlaylistEditPage.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/SearchPage.vue'),
      },
      {
        path: 'follows/:id?',
        name: 'follows',
        component: () => import('@/views/FollowsPage.vue'),
      },
      {
        path: 'fans/:id?',
        name: 'fans',
        component: () => import('@/views/FansPage.vue'),
      },
      {
        path: 'song/:id',
        name: 'song',
        component: () => import('@/views/SongPage.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const mainStore = useMainStore()
  const {
    isLogin, userDetail, currentSong, currentPlaylistId, currentSongList,
  } = storeToRefs(mainStore)
  if (!userDetail.value.uid) {
    await mainStore.init()
  }
  // 获取一首歌曲的信息
  const getSong = async (id: number) => {
    const { data } = await getMusicDetail({ ids: id })
    return {
      id: data.songs[0].id,
      name: data.songs[0].name,
      alias: data.songs[0].alia[0],
      author: data.songs[0].ar,
      album: data.songs[0].al,
      duration: data.songs[0].dt,
    }
  }
  // 获取一个歌单全部歌曲的信息
  const getAllSong = async (id: number) => {
    const { data } = await getPlaylistAllSongs({ id })
    const arr: any = []
    data.songs.forEach((item: any) => {
      const obj = {
        id: item.id,
        name: item.name,
        alias: item.alia[0],
        author: item.ar,
        album: item.al,
        duration: item.dt,
      }
      arr.push(obj)
    })
    return arr
  }
  // 用户刷新之后，自动读取 localStorage 中的播放歌曲数据
  if (!currentSong.value.id) {
    const id = Number(window.localStorage.getItem('current_song'))
    if (id) {
      currentSong.value = await getSong(id)
    }
  }
  // 用户刷新之后，自动读取 localStorage 中的播放列表数据
  if (!currentPlaylistId.value) {
    const id = Number(window.localStorage.getItem('current_playlist'))
    if (id) {
      currentPlaylistId.value = id
      currentSongList.value = await getAllSong(id)
    }
  }
  // 如果用户未登录且目标页面不是登录页，则跳转到登录页
  if (!isLogin.value && to.name !== 'login') { // 注意，一定要写后面的判断逻辑，否则会死循环
    return { name: 'login' }
  }
  // 如果用户已登录且目标页面是登录页，则停止跳转
  if (isLogin.value && to.name === 'login') {
    return from.fullPath
  }
  return true
})

export default router
