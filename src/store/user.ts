import { defineStore } from 'pinia'
import { getUserDetail, getLikeList } from '@/api/user'
import { UserDetail, UserLevel } from '@/assets/types/user'
import { getUserId, setUserId } from '@/utils/storage'

const userDetail: Partial<UserDetail> = {}

const userLevel: Partial<UserLevel> = {}

const likeList: number[] = []

export default defineStore('user', {
  state: () => ({
    userDetail,
    userLevel,
    isSidebarExpand: false,
    likeList,
  }),
  actions: {
    async init() {
      // 初始化，获取用户详细信息
      try {
        const uid = getUserId()
        const { data } = await getUserDetail({ uid })
        this.userDetail = data
        const { data: likeListData } = await getLikeList({ uid })
        this.likeList = likeListData.ids
      } catch {
        setUserId(0)
      }
    },
  },
})
