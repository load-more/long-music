<template>
  <el-row class="container" v-loading.fullscreen.lock="isFullLoading">
    <div class="left">
      <div>
        <img src="@/assets/img/logo.png" alt="logo" @click="router.push({ name: 'home' })" />
      </div>
    </div>
    <div class="mid">
      <SearchInput />
      <span @click="router.back()" class="hidden-xs-only">
        <i class="iconfont icon-left-arrow"></i>
      </span>
      <span @click="router.forward()" class="hidden-xs-only">
        <i class="iconfont icon-right-arrow"></i>
      </span>
      <span @click="router.go(0)" class="hidden-xs-only">
        <i class="iconfont icon-refresh"></i>
      </span>
    </div>
    <div class="right">
      <div class="tools hidden-xs-only">
        <i class="iconfont icon-notice"></i>
        <ThemeDropdown />
        <UserDropdown
          :nickname="nickname"
          :avatar-url="avatarUrl"
          @logout="isFullLoading = true"
        />
      </div>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'
import UserDropdown from './UserDropdown.vue'
import ThemeDropdown from './ThemeDropdown.vue'

/* 路由管理 */
const router = useRouter()

/* 渲染顶部栏用户数据 */
const { userDetail } = storeToRefs(useUserStore())
const { nickname, avatarUrl } = userDetail.value

/* 退出登录 */
const isFullLoading = ref(false)
</script>

<style scoped lang="scss">
.container {
  height: 70px;
  background-color: $header-bg-color;
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      img {
        margin-left: 20px;
        height: 70%;
        cursor: pointer;
        &:hover {
          height: 73%;
        }
        transition: all 0.1s ease-in;
      }
    }
  }
  .mid {
    display: flex;
    align-items: center;
    .icon-left-arrow, .icon-right-arrow, .icon-refresh {
      @include hover-font;
      padding-left: 20px;
    }
    span {
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .tools {
      display: flex;
      align-items: center;
      i {
        font-size: 18px;
        margin-right: 15px;
        cursor: pointer;
        @include hover-font;
      }
    }
  }
}
</style>
