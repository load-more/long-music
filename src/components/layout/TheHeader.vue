<template>
  <el-row class="container" v-loading.fullscreen.lock="isFullLoading">
    <el-col :sm="7" :xs="0" class="left">
      <div>
        <img src="@/assets/logo.png" alt="logo" @click="router.push({ name: 'home' })" />
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
          :src="state.avatarUrl"
          @click="router.push({ name: 'profile' })"
        ></el-avatar>
        <el-dropdown trigger="click" @command="handleCommand" class="name-wrap">
          <span class="el-dropdown-link">
            {{ state.nickname }}
            <i class="iconfont icon-drop-down-arrow"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item divided command="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="tools hidden-xs-only">
        <i class="iconfont icon-Message"></i>
        <i class="iconfont icon-theme"></i>
        <i class="iconfont icon-setting"></i>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/index'
import { useRouter } from 'vue-router'
import { logout } from '@/api/login'
import { getUserDetail } from '@/api/user'
import { ElMessage } from 'element-plus'
import { ref, reactive, watch } from 'vue'
import { Decrypt } from '@/utils/secret'
import emitter from '@/utils/emitter'
import SearchInput from '@/components/common/SearchInput.vue'

/* 路由管理 */
const router = useRouter()

/* 渲染顶部栏用户数据 */
const { isLogin } = storeToRefs(useMainStore())
const state = reactive({
  nickname: '',
  avatarUrl: '',
})

const getData = async () => {
  const uid = Decrypt(String(window.localStorage.getItem('uid')))
  const { data } = await getUserDetail({ uid })
  state.nickname = data.profile.nickname
  state.avatarUrl = data.profile.avatarUrl
}

watch(
  isLogin,
  async () => {
    // 一旦登录状态改变，请求数据或不执行操作
    if (isLogin.value) {
      await getData()
    }
  },
  { immediate: true },
)

/* 退出登录 */
const isFullLoading = ref(false)

const handleCommand = async (command: string) => {
  if (command === 'logout') {
    isFullLoading.value = true
    const rst = await logout()
    if (rst.data.code === 200) {
      // 切换登录状态
      isLogin.value = false
      // 跳转到首页
      router.push({ name: 'login' })
      // 清除 localStorage
      window.localStorage.clear()
      ElMessage({
        type: 'success',
        message: '退出成功',
        appendTo: document.body,
      })
    }
    isFullLoading.value = false
  }
}

/* 监听是否更新头部数据 */
emitter.on('onRefreshGlobalHeader', async () => {
  await getData()
})
</script>

<style scoped lang="scss">
.container {
  height: 70px;
  background-color: #000;
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
      color: #ddd;
      padding-left: 10px;
      &:hover {
        color: #fff;
      }
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
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .avatar {
        cursor: pointer;
      }
      .name-wrap {
        margin: 0 15px;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
      &:hover {
        color: #fff;
        i {
          color: #fff;
        }
      }
    }
    .user-info i {
      color: gray;
      font-size: 12px;
    }
    .tools i {
      font-size: 18px;
      margin-right: 15px;
      cursor: pointer;
      color: #ddd;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
