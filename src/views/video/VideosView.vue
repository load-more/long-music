<template>
  <div class="videos-container">
    <el-scrollbar>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="视频" name="video">
          <VideosMain />
        </el-tab-pane>
        <el-tab-pane label="MV" name="mv">
          mv
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideosMain from './videos/VideosMain.vue'

const activeTab = ref('video')
</script>

<style scoped lang="scss">
.videos-container {
  height: 100%;
}
</style>
