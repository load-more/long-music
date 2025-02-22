<template>
  <div>
    <div v-if="type === 'follows' || type === 'fans'" class="item-wrap">
      <div
        class="item"
        v-for="(item) in users"
        :key="item.userId"
      >
        <div class="left">
          <el-avatar
            class="avatar"
            :src="`${item.avatarUrl}?param=80y80`"
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
              v-if="userDetail.profile?.userId === uid"
              size="small"
              round
            >
              <i class="iconfont icon-message"></i>
              &nbsp;私信
            </el-button>
            <el-button
              v-if="userDetail.profile?.userId !== uid &&
                    userDetail.profile?.userId !== item.userId &&
                    !item.followed"
              size="small"
              round
              @click="handleClickFollow(item.userId)"
            >
              <i class="iconfont icon-follow"></i>
              &nbsp;关注
            </el-button>
            <el-button
              v-if="userDetail.profile?.userId !== uid &&
                    userDetail.profile?.userId !== item.userId &&
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
              <span
                class="single-line-ellipsis"
              >歌单：{{ (item as UserRelation).playlistCount }}</span>
              <span
                class="single-line-ellipsis"
              >粉丝：{{ (item as UserRelation).followeds }}</span>
              <span
                class="single-line-ellipsis"
              >关注：{{ (item as UserRelation).follows }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="item-wrap">
      <div
        class="item"
        v-for="(item) in users"
        :key="item.userId"
      >
        <div class="left">
          <el-avatar
            class="avatar"
            :src="`${item.avatarUrl}?param=80y80`"
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
              v-if="userDetail.profile?.userId === uid"
              size="small"
              round
            >
              <i class="iconfont icon-message"></i>
              &nbsp;私信
            </el-button>
            <el-button
              v-if="userDetail.profile?.userId !== uid &&
                    userDetail.profile?.userId !== item.userId &&
                    !item.followed"
              size="small"
              round
              @click="handleClickFollow(item.userId)"
            >
              <i class="iconfont icon-follow"></i>
              &nbsp;关注
            </el-button>
            <el-button
              v-if="userDetail.profile?.userId !== uid &&
                    userDetail.profile?.userId !== item.userId &&
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { followOrUnfollow } from '@/api/user'
import { ElMessage } from 'element-plus'
import type { User, UserRelation } from '@/assets/types/user'

defineProps<{
  uid: number
  users: User[] | UserRelation[]
  type: 'follows' | 'fans' | 'subscribers'
}>()
const emit = defineEmits(['updateArray'])

const router = useRouter()
const { userDetail } = storeToRefs(useUserStore())

const handleClickRelation = (uid: number) => {
  router.push({ name: 'user', params: { id: uid } })
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
      background-color: $item-hover-color;
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
