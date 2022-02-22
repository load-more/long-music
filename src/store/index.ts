import { defineStore } from 'pinia'

const checkCookie = (cName: string) => {
  const { cookie } = document
  const arr = cookie.split('; ')
  return !!arr.find((item) => item.split('=')[0] === cName)
}
const cName = 'MUSIC_U'
const isLogin = checkCookie(cName)
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

export default defineStore('main', {
  state: () => ({
    isLogin,
    currentSong,
    currentSongList,
    listenedSongSet,
  }),
})
