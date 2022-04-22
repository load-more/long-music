<template>
  <div class="video-item-wrap">
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${video?.coverUrl})`}"
        @click="router.push({ name: 'video', params: { id: video?.vid } })"
      ></div>
      <span class="play-count">
        <i class="iconfont icon-play"></i>&nbsp;{{ formatCount(video?.playTime) }}
      </span>
      <span class="duration">{{ formatDuration(video?.durationms) }}</span>
    </div>
    <div class="title single-line-ellipsis">
      <span
        :title="video?.title"
        @click="router.push({ name: 'video', params: { id: video?.vid } })"
      >{{ video?.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount, formatDuration } from '@/utils/format'
import { videoType } from '@/assets/ts/type'
import { useRouter } from 'vue-router'

defineProps<{
  video: videoType
}>()
const router = useRouter()
</script>

<style scoped lang="scss">
.video-item-wrap {
  width: 25%;
  margin-bottom: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  font-size: 14px;
  color: $font-color;
  .image-wrap {
    position: relative;
    .image {
      border-radius: 5px;
      cursor: pointer;
      height: 0;
      padding-top: 60%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
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
