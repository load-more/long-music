<template>
  <div class="home-container">
    <el-scrollbar class="scroll-bar">
      <div class="banner-container">
        <span class="home-label">个性推荐</span>
        <HomeBanner />
      </div>
      <div class="rcmd-playlist-container">
        <span class="home-label">每日推荐</span>
        <RcmdPlaylist />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import HomeBanner from '@/components/home/HomeBanner.vue'
import RcmdPlaylist from '@/components/home/RcmdPlaylist.vue'
</script>

<style scoped lang="scss">
.home-container {
  height: 100%;
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
