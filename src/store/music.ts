import { defineStore } from 'pinia'
import { songType } from '@/assets/ts/type'

const currentSong: songType = {
  id: 0,
  name: '',
  alias: [],
  tns: [],
  artists: [],
  album: {
    id: 0,
    name: '',
    picUrl: '',
    tns: [],
  },
  duration: 0,
  mv: 0,
  hasSq: false,
  isVip: false,
  canPlay: false,
  hasSrc: false,
  noCopyrightInfo: {
    type: 0,
    typeDesc: '',
  },
  isPlay: false,
}

const currentSongList: songType[] = []

const listenedSongSet = new Set()

const currentPlayTime = 0

const currentPlaylistId = 0

export default defineStore('music', {
  state: () => ({
    currentSong,
    currentSongList,
    listenedSongSet,
    currentPlayTime,
    currentPlaylistId,
  }),
  actions: {
    resetCurrentSong() {
      this.currentSong = {
        id: 0,
        name: '',
        alias: [],
        tns: [],
        artists: [],
        album: {
          id: 0,
          name: '',
          picUrl: '',
          tns: [],
        },
        duration: 0,
        mv: 0,
        hasSq: false,
        isVip: false,
        canPlay: false,
        hasSrc: false,
        noCopyrightInfo: {
          type: 0,
          typeDesc: '',
        },
        isPlay: false,
      }
    },
  },
})
