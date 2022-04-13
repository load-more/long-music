<template>
  <div class="profile-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="user-profile-container">
        <UserProfile :uid="Number(uid)" @finish-loading="handleFinishLoading" />
      </div>
      <div class="user-playlist-container">
        <UserPlaylist :uid="Number(uid)" @finish-loading="handleFinishLoading" />
      </div>
    </el-scrollbar>
    <LoadingAnimation v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Decrypt } from '@/utils/secret'
import LoadingAnimation from '@/components/loading/LoadingAnimation.vue'
import UserProfile from './profile/UserProfile.vue'
import UserPlaylist from './playlist/UserPlaylist.vue'

const route = useRoute()
const uid = route.params.id || Decrypt(String(window.localStorage.getItem('uid')))
const isLoading = ref(true)

const loadedCount = ref(0)
const handleFinishLoading = () => {
  loadedCount.value += 1
  if (loadedCount.value === 2) {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.profile-container {
  height: 100%;
  .scroll-bar {
    height: 100%;
  }
  .user-profile-container, .user-playlist-container {
    padding: 20px;
  }
}
</style>
