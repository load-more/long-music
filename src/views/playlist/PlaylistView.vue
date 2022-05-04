<template>
  <div class="playlist-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="playlist-profile-container">
        <PlaylistProfile
          :uid="uid"
          @finish-loading="handleFinishLoading"
        />
      </div>
      <div class="playlist-music-list-container">
        <PlaylistContent
          :uid="uid"
          @finish-loading="handleFinishLoading"
        />
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
import PlaylistProfile from './profile/PlaylistProfile.vue'
import PlaylistContent from './content/PlaylistContent.vue'

const { userDetail } = storeToRefs(useUserStore())

const isLoading = ref(true)
const loadedCount = ref(0)
const route = useRoute()
const uid = Number(route.params.id) || userDetail.value.userId

const handleFinishLoading = () => {
  loadedCount.value += 1
  if (loadedCount.value === 2) {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.playlist-container {
  height: 100%;
  .scroll-bar {
    height: 100%;
  }
  .playlist-profile-container,
  .playlist-music-list-container {
    padding: 20px;
  }
}
</style>
