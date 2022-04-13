<template>
  <el-dropdown
    trigger="click"
    @command="handleCommand"
    popper-class="dropdown"
    class="name-wrap"
  >
    <el-avatar
      class="avatar"
      fit="cover"
      :size="30"
      :src="avatarUrl"
    ></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          command="profile"
        >
          <i class="iconfont icon-profile"></i>
          个人信息
        </el-dropdown-item>
        <el-dropdown-item
          command="logout"
        >
          <i class="iconfont icon-setting"></i>
          用户设置
        </el-dropdown-item>
        <el-dropdown-item
          command="logout"
        >
          <i class="iconfont icon-logout"></i>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { logout } from '@/api/login'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/index'
import { useRouter } from 'vue-router'

/* 路由管理 */
const router = useRouter()

defineProps<{
  nickname: string
  avatarUrl: string
}>()
const emit = defineEmits(['logout'])

const { isLogin } = storeToRefs(useMainStore())
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    emit('logout')
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
  } else if (command === 'profile') {
    router.push({ name: 'user' })
  }
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  @include hover-font;
  cursor: pointer;
  i {
    font-size: 12px;
  }
}
.name-wrap {
  margin-right: 15px;
}
.avatar {
  cursor: pointer;
}
</style>
