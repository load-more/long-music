import { defineStore } from 'pinia'
import { getUserDetail } from '@/api/user'
import { Decrypt } from '@/utils/secret'

// const checkCookie = (cName: string) => {
//   const { cookie } = document
//   const arr = cookie.split('; ')
//   return !!arr.find((item) => item.split('=')[0] === cName)
// }
// const cName = 'MUSIC_U'

const isLogin = false

interface songType {
  id: number
  name: string
  alias: string
  author: { id: number, name: string }[]
  album: { name: string }
  duration: number
  isPlay?: boolean
  mv: number // 0: 无 MV; !0: 有 MV
  fee: number // 0: 免费/无版权; 1: VIP; 4: 歌曲所在专辑需单独付费; 8: 低品免费，高品下载收费; 16: 无音源
  maxbr: number // 999000: SQ
  st: number // 0: 可以播放; !0: 不可播放
  noCopyrightRcmd: any // 无版权信息
}
const currentSong: songType = {
  id: 0,
  name: '',
  alias: '',
  author: [],
  album: { name: '' },
  duration: 0,
  mv: 0,
  fee: 0,
  maxbr: 0,
  st: 0,
  noCopyrightRcmd: null,
}

const currentSongList: songType[] = []

const listenedSongSet = new Set()

const currentPlayTime = 0

const currentPlaylistId = 0

const uid = Decrypt(String(window.localStorage.getItem('uid')))
interface userDetailType {
  uid: number
  nickname: string
  avatarUrl: string
}
const userDetail: userDetailType = {
  uid: 0,
  nickname: '',
  avatarUrl: '',
}

export default defineStore('main', {
  state: () => ({
    isLogin,
    currentSong,
    currentSongList,
    listenedSongSet,
    userDetail,
    currentPlayTime,
    currentPlaylistId,
  }),
  actions: {
    async init() {
      try {
        const { data } = await getUserDetail({ uid })
        if (data.code === 200) {
          this.userDetail.uid = Number(uid)
          this.userDetail.nickname = data.profile.nickname
          this.userDetail.avatarUrl = data.profile.avatarUrl
          this.isLogin = true
        } else {
          window.localStorage.removeItem('uid')
        }
      } catch {
        window.localStorage.removeItem('uid')
      }
    },
  },
})
