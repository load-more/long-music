<template>
  <div class="user-item-wrap" @click="router.push({ name: 'user', params: { id: user?.userId } })">
    <div class="left">
      <el-avatar
        class="avatar"
        :src="`${user.avatarUrl}?param=60y60`"
      ></el-avatar>
      <span class="name single-line-ellipsis" :title="user.nickname">{{ user.nickname }}</span>
      <i v-if="user.gender === 1" class="iconfont icon-male"></i>
      <i v-if="user.gender === 2" class="iconfont icon-female"></i>
    </div>
    <div class="right">
      <span class="two-lines-ellipsis" :title="user.signature">{{ user.signature }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/assets/types/user'
import { useRouter } from 'vue-router'

defineProps<{
  user: User
}>()

const router = useRouter()
</script>

<style scoped lang="scss">
.user-item-wrap {
  color: $font-color;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: $item-color-1;
  border-radius: 15px;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: $item-hover-color;
  }
  .left {
    display: flex;
    align-items: center;
    width: 50%;
    .avatar {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
    }
    .name {
      margin: 0 5px;
    }
    .icon-male {
      color: blue;
    }
    .icon-female {
      color: pink;
    }
  }
  .right {
    width: 40%;
  }
}
</style>
