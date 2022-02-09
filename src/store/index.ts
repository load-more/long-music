import { defineStore } from 'pinia'

const checkCookie = (cName: string) => {
  const { cookie } = document
  const arr = cookie.split('; ')
  return !!arr.find((item) => item.split('=')[0] === cName)
}
const cName = 'MUSIC_U'
const isLogin = checkCookie(cName)

export default defineStore('main', {
  state: () => ({
    isLogin,
  }),
})
