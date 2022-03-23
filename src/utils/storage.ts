import themeData from '@/assets/js/themeData'

const historyKey = 'search_history'
const themeKey = 'theme_color'

export const getSearchHistory = () => {
  let history
  try {
    history = JSON.parse(window.localStorage.getItem(historyKey) as string)
    if (!Array.isArray(history)) {
      history = []
    }
  } catch {
    history = []
  }
  return history
}

export const setSearchHistory = (value: string) => {
  const history = getSearchHistory()
  if (!history.some((item) => item === value)) { // 去重
    history.push(value)
    window.localStorage.setItem(historyKey, JSON.stringify(history))
  }
}

export const clearSearchHistory = () => {
  window.localStorage.setItem(historyKey, '[]')
}

export const removeHistory = (keyword: string) => {
  const history = getSearchHistory()
  const index = history.findIndex((item) => item === keyword)
  history.splice(index, 1)
  window.localStorage.setItem(historyKey, JSON.stringify(history))
}

export const getThemeColor = () => {
  let currentTheme = window.localStorage.getItem(themeKey)
  if (!Object.keys(themeData).some((color) => color === currentTheme)) {
    [currentTheme] = Object.keys(themeData)
  }
  return currentTheme
}

export const setThemeColor = (themeColor: string) => {
  window.localStorage.setItem(themeKey, themeColor)
}
