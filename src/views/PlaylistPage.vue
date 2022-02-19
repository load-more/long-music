<template>
  <div class="playlist-container">
    <el-scrollbar height="450px">
      <PlaylistProfile />
      <PlaylistMusicList />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import PlaylistProfile from '@/components/playlist/PlaylistProfile.vue'
import PlaylistMusicList from '@/components/playlist/PlaylistMusicList.vue'
</script>

<style scoped lang="scss">
.playlist-container {
  padding: 20px;
}
</style>
