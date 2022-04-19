<template>
  <div class="mv-item-wrap">
    <div class="image-wrap">
      <el-image
        class="image"
        :src="mv?.imgurl16v9"
      ></el-image>
      <span class="play-count">
        <i class="iconfont icon-play"></i>&nbsp;{{ formatCount(mv?.playCount) }}
      </span>
      <span class="duration">{{ formatDuration(mv?.duration) }}</span>
    </div>
    <div class="title single-line-ellipsis">
      <span :title="mv?.name">{{ mv?.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount, formatDuration } from '@/utils/format'
import { mvType } from '@/assets/ts/type'

defineProps<{
  mv: mvType
}>()
</script>

<style scoped lang="scss">
.mv-item-wrap {
  width: 25%;
  margin-bottom: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  font-size: 14px;
  .image-wrap {
    position: relative;
    .image {
      border-radius: 5px;
      cursor: pointer;
    }
    .play-count {
      position: absolute;
      top: 5px;
      right: 5px;
      i {
        font-size: 14px;
      }
    }
    .duration {
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
  }
  .title {
    margin-top: 10px;
    span {
      cursor: pointer;
      @include hover-font;
    }
  }
}
</style>
