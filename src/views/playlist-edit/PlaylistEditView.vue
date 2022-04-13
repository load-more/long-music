<template>
  <div class="playlist-edit-container">
    <el-scrollbar class="scroll-bar">
      <div class="playlist-edit-form-container">
        <span class="label">编辑歌单信息</span>
        <PlaylistEditForm />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import PlaylistEditForm from './form/PlaylistEditForm.vue'
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
