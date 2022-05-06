import { defineStore } from 'pinia'
import { songType } from '@/assets/ts/type'
import { getMusicUrl, getMusicLyric } from '@/api/music'
import { formatLyricTime } from '@/utils/format'
import { ElMessage } from 'element-plus'
import {
  setSongId,
  setListId,
  setVolume,
  setListType,
} from '@/utils/storage'

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
}

const currentSongList: songType[] = []

export default defineStore('music', {
  state: () => ({
    currentSong,
    currentSongList,
    listenedSongSet: new Set(), // 用于随机播放去重
    currentPlaylistId: 0,
    audio: new Audio(),
    isPlayed: false,
    duration: 0,
    currentTime: 0,
    currentLyricMap: new Map(),
    currentLyric: '',
    volume: 100,
    playMode: [
      'order-play',
      'loop',
      'single-loop',
      'random-play',
      'heartbeat',
    ],
    playModeLabel: [
      '顺序播放',
      '列表循环',
      '单曲循环',
      '随机播放',
      '心动模式',
    ],
    playModeIndex: 0,
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
      }
      this.audio = new Audio()
      this.isPlayed = false
      this.duration = 0
      this.currentTime = 0
    },
    async updateCurrentSong(song: songType) {
      // 暂停之前音乐的播放
      this.pauseMusic()
      // 覆盖 currentSong
      this.currentSong = song
      // 存入 localStorage
      setSongId(song.id)
      // 新建一个 Audio
      this.audio = new Audio()
      // 初始化音量
      this.audio.volume = this.volume / 100
      // 初始化音源
      if (song.isVip) {
        const { data } = await getMusicUrl({ id: song.id })
        this.audio.src = data.data[0].url
      } else {
        this.audio.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
      }

      // 注意，要在 canplaythrough 阶段设置参数，否则会获取不到相应参数
      this.audio.addEventListener('canplaythrough', () => {
        // 初始化数据
        this.duration = this.audio.duration
        this.currentTime = this.audio.currentTime
        this.volume = this.audio.volume * 100
      })
      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio.currentTime
      })
      // 当音乐结束
      this.audio.addEventListener('ended', async () => {
        this.pauseMusic()
        const currentPlayMode = this.playMode[this.playModeIndex]
        if (currentPlayMode === 'order-play' || currentPlayMode === 'heartbeat') {
          // 如果不是最后一首歌，则直接下一首
          if (this.currentSong.id !== this.currentSongList[this.currentSongList.length - 1].id) {
            await this.changeSong(1)
          }
        } else if (currentPlayMode === 'single-loop') {
          // 单曲循环播放
          this.playMusic()
        } else { // 如果是“随机播放”或“列表循环”
          await this.changeSong(1)
        }
      })
      // 获取歌词
      this.updateCurrentLyricMap(song.id)
    },
    playMusic() {
      // 将歌曲存入已播放集合中（不管能不能播放，都要存入）
      this.listenedSongSet.add(this.currentSong.id)
      // 如果集合满了，则清空集合并重新记录
      if (this.listenedSongSet.size === this.currentSongList.length) {
        this.listenedSongSet = new Set()
        this.listenedSongSet.add(this.currentSong.id)
      }
      if (!this.currentSong.canPlay) {
        ElMessage({
          type: 'error',
          message: '该歌曲无版权，暂时无法播放',
          appendTo: document.body,
        })
        return
      }
      if (this.currentSong.isVip) {
        ElMessage({
          type: 'warning',
          message: 'VIP歌曲试听30秒',
          appendTo: document.body,
        })
      }
      this.audio.play()
      this.isPlayed = true
    },
    pauseMusic() {
      this.audio.pause()
      this.isPlayed = false
    },
    changeVolume(volume: number) {
      this.audio.volume = volume / 100
      this.volume = volume
      // 存入 localStorage
      setVolume(volume)
    },
    changeCurrentTime(ct: number) {
      this.audio.currentTime = ct
      this.currentTime = ct
    },
    changePlayMode() {
      this.playModeIndex = (this.playModeIndex + 1) % this.playMode.length
    },
    async changeSong(interval: number) {
      if (!this.currentSongList.length) return

      // 生成新的索引
      let newIndex = null
      const index = this.currentSongList.findIndex(
        (song) => song.id === this.currentSong.id,
      )
      const currentPlayMode = this.playMode[this.playModeIndex]
      if (currentPlayMode === 'random-play') { // 如果是“随机播放”模式
        // 随机生成一个不重复的索引
        newIndex = Math.floor(Math.random() * this.currentSongList.length)
        while (this.listenedSongSet.has(this.currentSongList[newIndex].id)) {
          newIndex = Math.floor(Math.random() * this.currentSongList.length)
        }
      } else { // 如果是其他模式
        // 考虑 index 小于 0 或大于最大长度的情况
        newIndex = (index + interval + this.currentSongList.length) % this.currentSongList.length
      }

      // 切换当前歌曲
      await this.updateCurrentSong(this.currentSongList[newIndex])
      // 自动播放
      this.playMusic()
    },
    updateCurrentSongList(id: number, list: songType[], type: number = 1) {
      this.currentSongList = list
      this.listenedSongSet = new Set()
      this.currentPlaylistId = id
      // 存入 localStorage
      setListId(id)
      setListType(type)
    },
    addSongToCurrentSongList(song: songType) {
      // 去重
      if (this.listenedSongSet.has(song.id)) return
      const index = this.currentSongList.findIndex((item) => item.id === this.currentSong.id)
      this.currentSongList.splice(index + 1, 0, song)
    },
    async updateCurrentLyricMap(id: number) {
      this.currentLyricMap = new Map()
      const { data } = await getMusicLyric({ id })
      // 处理歌词
      // eslint-disable-next-line no-useless-escape
      const kArr = data.lrc.lyric.match(/\[[\d+:\d+\.\d+]*\]/g)
      // eslint-disable-next-line no-useless-escape
      const vArr = data.lrc.lyric.split(/\[[\d+:\d+\.\d+]*\]/g).slice(1)
      kArr.forEach((item: string, index: number) => {
        const key = formatLyricTime(item.slice(1, item.length - 1))
        this.currentLyricMap.set(key, vArr[index])
      })
    },
  },
})
