import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      isLogin: false,
      profile: {},
      detail: {},
      levelInfo: {}
    }
  }
})