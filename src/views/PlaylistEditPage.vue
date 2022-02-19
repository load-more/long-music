<template>
  <div class="playlist-edit-container">
    <h2>编辑歌单信息</h2>
    <PlaylistEditForm />
  </div>
</template>

<script setup lang="ts">
import PlaylistEditForm from '@/components/playlist/PlaylistEditForm.vue'
</script>

<style scoped lang="scss">
.playlist-edit-container {
  padding: 20px;
}
</style>
