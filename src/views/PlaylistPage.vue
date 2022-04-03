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
        <PlaylistMusicList
          :uid="uid"
          @finish-loading="handleFinishLoading"
        />
      </div>
    </el-scrollbar>
    <LoadingAnimation v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaylistProfile from '@/components/playlist/PlaylistProfile.vue'
import PlaylistMusicList from '@/components/playlist/PlaylistMusicList.vue'
import LoadingAnimation from '@/components/common/LoadingAnimation.vue'
import { useRoute } from 'vue-router'
import { Decrypt } from '@/utils/secret'

const isLoading = ref(true)
const loadedCount = ref(0)
const route = useRoute()
const uid = route.params.id || Decrypt(String(window.localStorage.getItem('uid')))

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
