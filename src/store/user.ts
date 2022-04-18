import { defineStore } from 'pinia'
import { getUserDetail } from '@/api/user'
import { userDetailType } from '@/assets/ts/type'
import { resolveUserDetail } from '@/utils/resolve'
import { getUserId, setUserId } from '@/utils/storage'

const userDetail: userDetailType = {
  userId: 0,
  nickname: '',
  gender: 0,
  birthday: 0,
  avatarUrl: '',
  description: '',
  province: 0,
  city: 0,
  followed: false,
  signature: '',
  followeds: 0,
  follows: 0,
  playlistCount: 0,
  createTime: 0,
  createDays: 0,
  level: 0,
  listenSongs: 0,
}

export default defineStore('user', {
  state: () => ({
    userDetail,
  }),
  actions: {
    async init() {
      // 初始化，获取用户详细信息
      try {
        const uid = getUserId()
        const { data } = await getUserDetail({ uid })
        this.userDetail = resolveUserDetail(data)
      } catch {
        setUserId(0)
      }
    },
  },
})
