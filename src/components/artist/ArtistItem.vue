<template>
  <div class="artist-wrap">
    <el-image
      class="image"
      :src="artist?.img1v1Url"
    ></el-image>
    <div class="name">
      <span>{{ artist?.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { artistType } from '@/assets/ts/type'

defineProps<{
  artist: artistType
}>()
</script>

<style scoped lang="scss">
.artist-wrap {
  width: 20%;
  padding-right: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .image {
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }
  .name {
    margin-top: 5px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    @include hover-font;
  }
}
</style>
