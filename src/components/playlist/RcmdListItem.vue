<template>
  <div class="wrap">
    <el-image
      class="image"
      :src="info.picUrl"
    ></el-image>
    <div class="title">{{ info.name }}</div>
    <div class="play-count">
      <i class="iconfont icon-play"></i>
      <span>{{ formatPlayCount(info.playCount) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPlayCount } from '@/utils/format'

interface rcmdType {
  id: number
  name: string
  picUrl: string
  playCount: number
}
defineProps<{
  info: rcmdType
}>()
</script>

<style scoped lang="scss">
.wrap {
  width: 20%;
  height: 250px;
  display: flex;
  flex-direction: column;
  position: relative;
  .image {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    cursor: pointer;
  }
  .title {
    margin-top: 10px;
    width: 200px;
    color: rgb(173, 173, 173);
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
  .play-count {
    color: white;
    position: absolute;
    top: 2px;
    left: 2px;
  }
}
</style>
