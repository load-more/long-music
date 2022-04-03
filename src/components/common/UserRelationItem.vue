<template>
  <div class="item-wrap">
    <div
      class="item"
      v-for="(item) in relation"
      :key="item.userId"
    >
      <div class="left">
        <el-avatar
          class="avatar"
          :src="item.avatarUrl"
          shape="circle"
          @click="handleClickRelation(item.userId)"
        ></el-avatar>
      </div>
      <div class="right">
        <div class="top">
          <span
            class="nickname single-line-ellipsis"
            @click="handleClickRelation(item.userId)"
          >{{ item.nickname }}</span>
          <el-button
            v-if="mainStore.userDetail.uid === uid"
            size="small"
            round
          >
            <i class="iconfont icon-message"></i>
            &nbsp;私信
          </el-button>
          <el-button
            v-if="mainStore.userDetail.uid !== uid &&
                  mainStore.userDetail.uid !== item.userId &&
                  !item.followed"
            size="small"
            round
            @click="handleClickFollow(item.userId)"
          >
            <i class="iconfont icon-follow"></i>
            &nbsp;关注
          </el-button>
          <el-button
            v-if="mainStore.userDetail.uid !== uid &&
                  mainStore.userDetail.uid !== item.userId &&
                  item.followed"
            size="small"
            disabled
            round
          >
            <i class="iconfont icon-follower"></i>
            &nbsp;已关
          </el-button>
        </div>
        <div class="bottom">
          <div class="signature single-line-ellipsis">
            <span>{{ item.signature }}</span>
          </div>
          <div class="info">
            <span class="single-line-ellipsis">歌单：{{ item.playlistCount }}</span>
            <span class="single-line-ellipsis">粉丝：{{ item.followeds }}</span>
            <span class="single-line-ellipsis">关注：{{ item.follows }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useMainStore from '@/store/index'
import { followOrUnfollow } from '@/api/user'
import { ElMessage } from 'element-plus'

export interface userType {
  userId: number
  nickname: string
  signature: string
  playlistCount: number
  followeds: number
  follows: number
  avatarUrl: string
  followed: boolean
}
defineProps<{
  uid: number
  relation: userType[]
}>()
const emit = defineEmits(['updateArray'])

const router = useRouter()
const mainStore = useMainStore()

const handleClickRelation = (uid: number) => {
  router.push({ name: 'profile', params: { id: uid } })
}

const handleClickFollow = async (uid: number) => {
  const { data } = await followOrUnfollow({
    id: uid,
    t: 1,
  })
  if (data.code === 200) {
    emit('updateArray', uid) // 更新关注按钮
    ElMessage({
      type: 'success',
      message: '关注成功！',
      appendTo: document.body,
    })
  }
}
</script>

<style scoped lang="scss">
.item-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 50%;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    &:hover {
      background-color: $bg-color-1;
    }
    .left {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      .avatar {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 100%;
      overflow: hidden;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $font-color;
        .nickname {
          cursor: pointer;
        }
        .nickname:hover {
          color: $font-active-color;
        }
      }
      .bottom {
        font-size: 13px;
        color: $font-inactive-color;
        .info {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          :nth-child(2) {
            padding: 0 10px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .item {
      width: 100%;
    }
  }
}
</style>
