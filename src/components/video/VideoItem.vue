<template>
  <div class="video-item-wrap" v-if="type === 'video'">
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${(video as videoType)?.coverUrl})`}"
        @click="router.push({ name: 'video', params: { id: (video as videoType)?.vid } })"
      ></div>
      <span class="play-count">
        <i class="iconfont icon-play"></i>&nbsp;{{ formatCount((video as videoType)?.playTime) }}
      </span>
      <span class="duration">{{ formatDuration((video as videoType)?.durationms) }}</span>
    </div>
    <div class="title single-line-ellipsis">
      <span
        :title="(video as videoType)?.title"
        @click="router.push({ name: 'video', params: { id: (video as videoType)?.vid } })"
      >{{ (video as videoType)?.title }}</span>
    </div>
  </div>
  <div class="video-item-wrap" v-else-if="type === 'artistMv'">
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${(video as mvType)?.imgurl16v9})`}"
        @click="router.push({ name: 'mv', params: { id: (video as mvType).id } })"
      ></div>
      <span class="play-count">
        <i class="iconfont icon-play"></i>&nbsp;{{ formatCount((video as mvType)?.playCount) }}
      </span>
      <span class="duration">{{ formatDuration((video as mvType)?.duration) }}</span>
    </div>
    <div class="title single-line-ellipsis">
      <span
        :title="(video as mvType)?.name"
        @click="router.push({ name: 'mv', params: { id: (video as mvType).id } })"
      >{{ (video as mvType)?.name }}</span>
    </div>
  </div>
  <div class="video-item-wrap" v-else>
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${(video as briefMvType)?.cover})`}"
        @click="router.push({ name: 'mv', params: { id: (video as briefMvType)?.id } })"
      ></div>
      <span class="play-count">
        <i class="iconfont icon-play"></i>&nbsp;{{ formatCount((video as briefMvType)?.playCount) }}
      </span>
    </div>
    <div class="title single-line-ellipsis">
      <span
        :title="(video as briefMvType)?.name"
        @click="router.push({ name: 'mv', params: { id: (video as briefMvType)?.id } })"
      >{{ (video as briefMvType)?.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount, formatDuration } from '@/utils/format'
import type { videoType, mvType, briefMvType } from '@/assets/ts/type'
import { useRouter } from 'vue-router'

defineProps<{
  type: 'video' | 'mv' | 'artistMv'
  video: videoType | mvType | briefMvType
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
