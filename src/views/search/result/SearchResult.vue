<template>
  <div class="search-result-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="单曲" name="music">
        <SearchResultMusic @finish-loading="handleFinishLoading" />
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        <SearchResultAlbum />
      </el-tab-pane>
      <el-tab-pane label="歌手" name="singer">
        <SearchResultArtist />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="playlist">
        <SearchResultPlaylist />
      </el-tab-pane>
      <el-tab-pane label="用户" name="user">
        <SearchResultUser />
      </el-tab-pane>
      <el-tab-pane label="视频" name="video">
        <SearchResultVideo />
      </el-tab-pane>
      <el-tab-pane label="歌词" name="lyrics"> Lyrics </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchResultMusic from './SearchResultMusic.vue'
import SearchResultAlbum from './SearchResultAlbum.vue'
import SearchResultArtist from './SearchResultArtist.vue'
import SearchResultPlaylist from './SearchResultPlaylist.vue'
import SearchResultUser from './SearchResultUser.vue'
import SearchResultVideo from './SearchResultVideo.vue'

const emit = defineEmits(['finish-loading'])

const activeTab = ref('music')

const handleFinishLoading = () => {
  emit('finish-loading')
}
</script>

<style scoped lang="scss">
.search-result-wrap {
  :deep .el-tabs__header {
    margin: 0;
  }
  :deep .el-tabs__content {
    margin-top: 10px;
  }
}
</style>
