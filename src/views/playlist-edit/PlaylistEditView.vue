<template>
  <div class="playlist-edit-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="playlist-edit-form-container">
        <span class="label">编辑歌单信息</span>
        <PlaylistEditForm @finish-loading="isLoading = false" />
      </div>
    </el-scrollbar>
    <WaveSpinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'
import PlaylistEditForm from './form/PlaylistEditForm.vue'

const isLoading = ref(true)
</script>

<style scoped lang="scss">
.playlist-edit-container {
  height: 100%;
  color: $font-color;
  .scroll-bar {
    height: 100%;
  }
  .label {
    font-family: 'yahei';
    font-size: 20px;
    display: inline-block;
    padding-bottom: 20px;
  }
  .playlist-edit-form-container {
    padding: 20px;
  }
}
</style>
