<template>
  <div class="song-container">
    <div class="top">
      <SongDetail :id="songId" />
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import SongDetail from '@/components/song/SongDetail.vue'

const route = useRoute()
const songId = Number(route.params.id)
</script>

<style scoped lang="scss">
.song-container {
  height: 100%;
  .top {
    padding: 20px;
  }
}
</style>
