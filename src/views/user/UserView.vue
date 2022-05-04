<template>
  <div class="profile-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="user-profile-container">
        <UserProfile :uid="uid" @finish-loading="handleFinishLoading" />
      </div>
      <div class="user-playlist-container">
        <UserPlaylist :uid="uid" @finish-loading="handleFinishLoading" />
      </div>
    </el-scrollbar>
    <WaveSpinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import UserProfile from './profile/UserProfile.vue'
import UserPlaylist from './content/UserPlaylist.vue'

const { userDetail } = storeToRefs(useUserStore())

const route = useRoute()
const uid = Number(route.params.id) || userDetail.value.userId
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
