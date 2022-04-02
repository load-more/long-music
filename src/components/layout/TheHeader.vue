<template>
  <el-row class="container" v-loading.fullscreen.lock="isFullLoading">
    <el-col :sm="7" :xs="0" class="left">
      <div>
        <img src="@/assets/img/logo.png" alt="logo" @click="router.push({ name: 'home' })" />
      </div>
    </el-col>
    <el-col :sm="9" :xs="12" class="mid">
      <span @click="router.back()" class="hidden-xs-only">
        <i class="iconfont icon-left-arrow"></i>
      </span>
      <span @click="router.forward()" class="hidden-xs-only">
        <i class="iconfont icon-right-arrow"></i>
      </span>
      <SearchInput />
    </el-col>
    <el-col :sm="8" :xs="12" class="right">
      <div class="user-info" v-if="isLogin">
        <el-avatar
          class="avatar"
          fit="cover"
          :size="40"
          :src="avatarUrl"
          @click="router.push({ name: 'profile' })"
        ></el-avatar>
        <UserDropdown :nickname="nickname" @logout="isFullLoading = true" />
      </div>
      <div class="tools hidden-xs-only">
        <i class="iconfont icon-message"></i>
        <ThemeDropdown />
        <i class="iconfont icon-setting"></i>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/index'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import SearchInput from '@/components/common/SearchInput.vue'
import UserDropdown from '@/components/common/UserDropdown.vue'
import ThemeDropdown from '@/components/common/ThemeDropdown.vue'

/* 路由管理 */
const router = useRouter()

/* 渲染顶部栏用户数据 */
const { isLogin, userDetail } = storeToRefs(useMainStore())
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
    .icon-left-arrow, .icon-right-arrow {
      @include hover-font;
      padding-left: 10px;
    }
    span {
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .user-info {
      @extend .right;
      .avatar {
        cursor: pointer;
      }
    }
    .user-info i {
      font-size: 12px;
    }
    .tools i {
      font-size: 18px;
      margin-right: 15px;
      cursor: pointer;
      @include hover-font;
    }
  }
}
</style>
