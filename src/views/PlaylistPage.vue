<template>
  <div class="playlist-container">
    <el-scrollbar class="scroll-bar">
      <div
        class="infinite-list"
        v-infinite-scroll="loadItem"
        :infinite-scroll-disabled="isScrollDisabled"
        :infinite-scroll-immediate="false"
      >
        <div class="playlist-profile-container">
          <PlaylistProfile />
        </div>
        <div class="playlist-music-list-container">
          <PlaylistMusicList
            @after-load-all="handleLoadAll"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaylistProfile from '@/components/playlist/PlaylistProfile.vue'
import PlaylistMusicList from '@/components/playlist/PlaylistMusicList.vue'
import emitter from '@/utils/emitter'

/* 加载列表 */
const isScrollDisabled = ref(false)

const loadItem = () => {
  emitter.emit('onLoadMusicListItem', true)
}
const handleLoadAll = () => {
  isScrollDisabled.value = true
}
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
