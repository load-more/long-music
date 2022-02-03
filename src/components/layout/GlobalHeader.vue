<template>
  <el-row class="container" v-loading.fullscreen.lock="isFullLoading">
    <el-col :span="4" class="left">
      <a href="/#">
        <img src="@/assets/logo.png" alt="logo">
      </a>
    </el-col>
    <el-col :span="6" class="mid">
      <span @click="router.back()">
        <i class="iconfont icon-left-arrow"></i>
      </span>
      <span @click="router.forward()">
        <i class="iconfont icon-right-arrow"></i>
      </span>
      <el-input
        class="w-50 m-2"
        placeholder="Pick a date"
      >
        <template #prefix>
          <a href="/#">
            <i class="iconfont icon-search"></i>
          </a>
        </template>
      </el-input>
      <a href="/#">
        <i class="iconfont icon-microphone"></i>
      </a>
    </el-col>
    <el-col :span="6" class="right">
      <div class="user-info" v-if="isLogin">
        <el-avatar
          class="avatar"
          fit="cover"
          :size="40"
          :src="profile['avatarUrl']"
          @click="router.push({ name: 'profile' })"
        ></el-avatar>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ profile['nickname'] }}
            <i class="iconfont icon-drop-down-arrow"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="login-info" v-else>
        <span @click="router.push('/login')">未登录</span>&nbsp;
        <i class="iconfont icon-drop-down-arrow"></i>
      </div>
      <a href="/#">
        <i class="iconfont icon-Message"></i>
      </a>
      <a href="/#">
        <i class="iconfont icon-theme"></i>
      </a>
      <a href="/#">
        <i class="iconfont icon-setting"></i>
      </a>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../../store/index'
import { useRouter } from 'vue-router'
import { logout } from '../../api/login'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const { isLogin, profile } = storeToRefs(useMainStore())
const router = useRouter()
const isFullLoading = ref(false)

const handleCommand = async (command: string) => {
  if (command === 'logout') {
    isFullLoading.value = true
    const rst = await logout()
    if (rst.data.code === 200) {
      isLogin.value = false
      ElMessage({
        type: 'success',
        message: '退出成功',
        appendTo: document.body
      })
    }
    isFullLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 70px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      img {
        height: 70%;
      }
    }
  }
  .mid {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-input {
      width: 200px;
    }
    .icon-left-arrow, .icon-right-arrow, .icon-microphone {
      color: #fff;
    }
    .icon-microphone {
      font-size: 24px;
    }
    .icon-search {
      color: #000;
    }
    span {
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 130px;
      .avatar {
        cursor: pointer;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
    }
    .login-info {
      span {
        font-size: 14px;
        color: #fff;
        cursor: pointer;
      }
    }
    .user-info i, .login-info i {
      color: gray;
      font-size: 12px;
    }
    i {
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
