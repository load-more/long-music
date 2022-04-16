import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useUserStore from '@/store/user'
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import { getMusicDetail } from '@/api/music'
import { getPlaylistAllSongs } from '@/api/playlist'
import { resolveSongsDetail } from '@/utils/resolve'
import { songType } from '@/assets/ts/type'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/layout/LayoutView.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/HomeView.vue'),
      },
      {
        path: 'user/:id?', // 注意，子路由不能带上 / ，否则无法显示路由
        name: 'user',
        component: () => import('@/views/user/UserView.vue'),
      },
      {
        path: 'edit-profile',
        name: 'editProfile',
        component: () => import('@/views/user-profile-edit/UserProfileEditView.vue'),
      },
      {
        path: 'playlist/:id',
        name: 'playlist',
        component: () => import('@/views/playlist/PlaylistView.vue'),
      },
      {
        path: 'edit-playlist/:id',
        name: 'editPlaylist',
        component: () => import('@/views/playlist-edit/PlaylistEditView.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/search/SearchView.vue'),
      },
      {
        path: 'follows/:id?',
        name: 'follows',
        component: () => import('@/views/follows/FollowsView.vue'),
      },
      {
        path: 'fans/:id?',
        name: 'fans',
        component: () => import('@/views/fans/FansView.vue'),
      },
      {
        path: 'song/:id',
        name: 'song',
        component: () => import('@/views/song/SongView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const { userDetail } = storeToRefs(useUserStore())
  const { currentSong, currentPlaylistId, currentSongList } = storeToRefs(useMusicStore())

  // 如果用户
  if (!userDetail.value.userId) {
    await useUserStore().init()
  }

  // 用户刷新之后，自动读取 localStorage 中的播放歌曲数据
  if (!currentSong.value.id) {
    const id = Number(window.localStorage.getItem('current_song'))
    if (id) {
      // 获取一首歌曲的信息
      const { data } = await getMusicDetail({ ids: id })
      const song: songType = resolveSongsDetail(data)[0]
      currentSong.value = song
    }
  }
  // 用户刷新之后，自动读取 localStorage 中的播放列表数据
  if (!currentPlaylistId.value) {
    const id = Number(window.localStorage.getItem('current_playlist'))
    if (id) {
      currentPlaylistId.value = id
      // 获取一个歌单全部歌曲的信息
      const { data } = await getPlaylistAllSongs({ id })
      const arr: songType[] = resolveSongsDetail(data)
      currentSongList.value = arr
    }
  }
  // 如果用户未登录且目标页面不是登录页，则跳转到登录页
  if (!userDetail.value.userId && to.name !== 'login') { // 注意，一定要写后面的判断逻辑，否则会死循环
    return { name: 'login' }
  }
  // 如果用户已登录且目标页面是登录页，则停止跳转
  if (userDetail.value.userId && to.name === 'login') {
    return from.fullPath
  }
  return true
})

export default router
