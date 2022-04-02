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
}
const currentSong: songType = {
  id: 0,
  name: '',
  alias: '',
  author: [],
  album: { name: '' },
  duration: 0,
}

const currentSongList: songType[] = []

const listenedSongSet = new Set()

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
