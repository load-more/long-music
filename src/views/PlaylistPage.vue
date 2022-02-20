<template>
  <div class="playlist-container">
    <el-scrollbar class="scroll-bar">
      <div class="playlist-profile-container">
        <PlaylistProfile />
      </div>
      <div class="playlist-music-list-container">
        <PlaylistMusicList />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import PlaylistProfile from '@/components/playlist/PlaylistProfile.vue'
import PlaylistMusicList from '@/components/playlist/PlaylistMusicList.vue'
</script>

<style scoped lang="scss">
.playlist-container {
  height: 100%;
  .scroll-bar {
    height: 100%;
  }
  .playlist-profile-container, .playlist-music-list-container {
    padding: 20px;
  }
}
</style>
