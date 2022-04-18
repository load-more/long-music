import themeData from '@/assets/ts/themeData'

const userId = 'user_id'
const songId = 'song_id'
const playlistId = 'playlist_id'
const volume = 'volume'
const searchHistory = 'search_history'
const themeColor = 'theme_color'

export const getUserId = () => Number(window.localStorage.getItem(userId))
export const setUserId = (id: number) => {
  window.localStorage.setItem(userId, String(id))
}

export const getSongId = () => Number(window.localStorage.getItem(songId))
export const setSongId = (id: number) => {
  window.localStorage.setItem(songId, String(id))
}

export const getPlaylistId = () => Number(window.localStorage.getItem(playlistId))
export const setPlaylistId = (id: number) => {
  window.localStorage.setItem(playlistId, String(id))
}

export const getVolume = () => Number(window.localStorage.getItem(volume))
export const setVolume = (value: number) => {
  window.localStorage.setItem(volume, String(value))
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
