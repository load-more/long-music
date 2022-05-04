<template>
  <div class="home-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="banner-container">
        <span class="home-label">个性推荐</span>
        <HomeBanner @finish-loading="handleFinishLoading" />
      </div>
      <div class="rcmd-playlist-container">
        <span class="home-label">每日推荐</span>
        <RcmdPlaylist @finish-loading="handleFinishLoading" />
      </div>
    </el-scrollbar>
    <WaveSpinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'
import HomeBanner from './banner/HomeBanner.vue'
import RcmdPlaylist from './recommend/RcmdPlaylist.vue'

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
.home-container {
  height: 100%;
  color: $font-color;
  .scroll-bar {
    height: 100%;
  }
  .home-label {
    font-size: 20px;
    font-family: 'yahei';
    display: inline-block;
    padding-bottom: 10px;
  }
  .banner-container, .rcmd-playlist-container {
    padding: 20px;
  }
  .rcmd-playlist-container {
    padding-right: 0;
  }
}
</style>
