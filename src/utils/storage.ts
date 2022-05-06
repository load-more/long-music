import themeData from '@/assets/ts/themeData'
import { Encrypt, Decrypt } from '@/utils/secret'

const userId = 'user_id'
const songId = 'song_id'
const listId = 'playlist_id'
const listType = 'list_type'
const volume = 'volume'
const searchHistory = 'search_history'
const themeColor = 'theme_color'
const currentTime = 'current_time'

export const getUserId = () => Number(Decrypt(window.localStorage.getItem(userId) || ''))
export const setUserId = (id: number) => {
  window.localStorage.setItem(userId, Encrypt(String(id)))
}

export const getSongId = () => Number(window.localStorage.getItem(songId))
export const setSongId = (id: number) => {
  window.localStorage.setItem(songId, String(id))
}

export const getListId = () => Number(window.localStorage.getItem(listId))
export const setListId = (id: number) => {
  window.localStorage.setItem(listId, String(id))
}

export const getListType = () => Number(window.localStorage.getItem(listType))
export const setListType = (typeId: number) => {
  window.localStorage.setItem(listType, String(typeId))
}

export const getVolume = () => {
  const volumeStr = window.localStorage.getItem(volume)
  if (!volumeStr && volumeStr !== '0') return 100
  const v = Number(volumeStr)
  if (Number.isNaN(v)) return 100
  return Number(volumeStr)
}
export const setVolume = (value: number) => {
  window.localStorage.setItem(volume, String(value))
}

export const getCurrentTime = () => {
  const currentTimeStr = window.localStorage.getItem(currentTime)
  const ct = Number(currentTimeStr)
  if (Number.isNaN(ct)) return 0
  return ct
}
export const setCurrentTime = (value: number) => {
  window.localStorage.setItem(currentTime, String(value))
}

export const getSearchHistory = () => {
  let history
  try {
    history = JSON.parse(window.localStorage.getItem(searchHistory) || '')
    if (!Array.isArray(history)) {
      history = []
    }
  } catch {
    history = []
  }
  return history
}
export const addSearchHistory = (value: string) => {
  const history = getSearchHistory()
  if (!history.some((item) => item === value)) { // 去重
    history.push(value)
    window.localStorage.setItem(searchHistory, JSON.stringify(history))
  }
}
export const removeSearchHistory = (keyword: string) => {
  const history = getSearchHistory()
  const index = history.findIndex((item) => item === keyword)
  history.splice(index, 1)
  window.localStorage.setItem(searchHistory, JSON.stringify(history))
}
export const clearSearchHistory = () => {
  window.localStorage.setItem(searchHistory, '[]')
}

export const getThemeColor = () => {
  let currentTheme = window.localStorage.getItem(themeColor)
  if (!Object.keys(themeData).some((color) => color === currentTheme)) {
    [currentTheme] = Object.keys(themeData)
  }
  return currentTheme
}
export const setThemeColor = (color: string) => {
  window.localStorage.setItem(themeColor, color)
}
