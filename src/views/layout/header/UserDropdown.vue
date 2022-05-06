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
      :src="`${avatarUrl}?param=30y30`"
    ></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          command="profile"
        >
          <i class="iconfont icon-profile"></i>
          个人信息
        </el-dropdown-item>
        <el-dropdown-item>
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
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'
import useMusicStore from '@/store/music'

/* 路由管理 */
const router = useRouter()

defineProps<{
  nickname: string
  avatarUrl: string
}>()
const emit = defineEmits(['logout'])

const handleCommand = async (command: string) => {
  if (command === 'logout') {
    emit('logout')
    const rst = await logout()
    if (rst.data.code === 200) {
      // 重置用户信息，即退出登录
      useUserStore().$reset()
      // 暂停音乐
      useMusicStore().pauseMusic()
      // 重置音乐信息
      useMusicStore().$reset()
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
.name-wrap {
  margin-right: 15px;
}
.avatar {
  cursor: pointer;
  display: inline-block;
  width: 30px;
  height: 30px;
}
</style>
