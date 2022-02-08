import { defineStore } from 'pinia'

const checkCookie = (cName: string) => {
  const cookie = document.cookie
  const arr = cookie.split('; ')
  return !!arr.find(item => item.split('=')[0] === cName)
}
const cName = 'MUSIC_U'
const isLogin = checkCookie(cName)

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      isLogin,
      detail: {},
      levelInfo: {}
    }
  }
})
