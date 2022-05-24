import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useUserStore from '@/store/user'
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import { getMusicDetail } from '@/api/music'
import { getPlaylistAllSongs } from '@/api/playlist'
import { getAlbumDetail } from '@/api/album'
import { resolveSongsDetail, resolveSearchSongsDetail } from '@/utils/resolve'
import {
  getSongId,
  getListId,
  getVolume,
  getListType,
  getCurrentTime,
} from '@/utils/storage'

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
      {
        path: 'album/:id',
        name: 'album',
        component: () => import('@/views/album/AlbumView.vue'),
      },
      {
        path: 'artist/:id',
        name: 'artist',
        component: () => import('@/views/artist/ArtistView.vue'),
      },
      {
        path: 'mv/:id',
        name: 'mv',
        component: () => import('@/views/video/MvView.vue'),
      },
      {
        path: 'video/:id',
        name: 'video',
        component: () => import('@/views/video/VideoView.vue'),
      },
      {
        path: 'videos',
        name: 'videos',
        component: () => import('@/views/video/VideosView.vue'),
      },
      {
        path: 'all-videos',
        name: 'allVideos',
        component: () => import('@/views/video/AllVideosView.vue'),
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

  const musicStore = useMusicStore()
  const {
    currentSong,
    currentPlaylistId,
  } = storeToRefs(musicStore)
  const {
    updateCurrentSong,
    updateCurrentSongList,
    changeVolume,
    changeCurrentTime,
  } = musicStore

  // 如果用户未登录，则重新获取用户信息
  if (!userDetail.value.profile) {
    await useUserStore().init()
  }

  /* 用户刷新后，自动读取 localStorage 存储的数据 */
  // 1. 读取播放歌曲
  if (!currentSong.value.id) {
    const id = getSongId()
    if (id) {
      // 获取一首歌曲的信息
      const { data } = await getMusicDetail({ ids: id })
      if (data.songs.length) {
        const song = resolveSongsDetail(data)[0]
        await updateCurrentSong(song)
      }
    }
  }
  // 2. 读取播放列表
  if (!currentPlaylistId.value) {
    const type = getListType()
    const id = getListId()
    if (type && id) {
      if (type === 1) { // 如果是歌单
        // 获取一个歌单全部歌曲的信息
        const { data } = await getPlaylistAllSongs({ id })
        if (data.songs.length) {
          const arr = resolveSongsDetail(data)
          updateCurrentSongList(id, arr)
        }
      } else if (type === 2) { // 如果是专辑
        const { data } = await getAlbumDetail({ id })
        if (data.songs.length) {
          const arr = resolveSearchSongsDetail(data.songs)
          updateCurrentSongList(id, arr, 2)
        }
      }
    }
  }
  // 3. 读取音量
  changeVolume(getVolume())
  // 4. 读取播放时间
  changeCurrentTime(getCurrentTime())

  // 如果用户未登录且目标页面不是登录页，则跳转到登录页
  if (!userDetail.value.profile && to.name !== 'login') { // 注意，一定要写后面的判断逻辑，否则会死循环
    return { name: 'login' }
  }
  // 如果用户已登录且目标页面是登录页，则停止跳转
  if (userDetail.value.profile && to.name === 'login') {
    return from.fullPath
  }
  return true
})

export default router
