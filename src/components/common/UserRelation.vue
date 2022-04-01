<template>
  <div class="user-relation-wrap">
    <div
      class="item"
      v-for="(item) in follows"
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
            class="nickname"
            @click="handleClickRelation(item.userId)"
          >{{ item.nickname }}</span>
          <el-button
            size="small"
            round
          >
          <i class="iconfont icon-Message"></i>
          &nbsp;私信</el-button>
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
import { onBeforeMount, ref } from 'vue'
import { getUserFollows } from '@/api/user'
import { useRouter } from 'vue-router'

const props = defineProps<{
  uid: number
}>()

interface followsType {
  userId: number
  nickname: string
  signature: string
  playlistCount: number
  followeds: number
  follows: number
  avatarUrl: string
}
const follows = ref<followsType[]>([])

/* 路由管理 */
const router = useRouter()

const getData = async () => {
  const { data } = await getUserFollows({ uid: props.uid })
  data.follow.forEach((item: followsType) => {
    follows.value.push({
      userId: item.userId,
      nickname: item.nickname,
      signature: item.signature,
      playlistCount: item.playlistCount,
      followeds: item.followeds,
      follows: item.follows,
      avatarUrl: item.avatarUrl,
    })
  })
}

const handleClickRelation = (uid: number) => {
  router.push({ name: 'profile', params: { id: uid } })
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.user-relation-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 50%;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
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
