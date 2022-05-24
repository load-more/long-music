<template>
  <div class="video-item-wrap" v-if="type === 'video'">
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${(video as VideoBrief).coverUrl}?param=300y160)`}"
        @click="router.push({ name: 'video', params: { id: (video as VideoBrief).vid } })"
      >
        <span class="play-count">
          <i class="iconfont icon-play"></i>&nbsp;{{ formatCount((video as VideoBrief).playTime) }}
        </span>
        <span class="duration">{{ formatDuration((video as VideoBrief).durationms) }}</span>
      </div>
    </div>
    <div class="title single-line-ellipsis">
      <span
        :title="(video as VideoBrief).title"
        @click="router.push({ name: 'video', params: { id: (video as VideoBrief).vid } })"
      >{{ (video as VideoBrief).title }}</span>
    </div>
  </div>
  <div class="video-item-wrap" v-else-if="type === 'artistMv'">
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${(video as Mv).imgurl16v9}?param=300y160)`}"
        @click="router.push({ name: 'mv', params: { id: (video as Mv).id } })"
      >
        <span class="play-count">
          <i class="iconfont icon-play"></i>&nbsp;{{ formatCount((video as Mv).playCount) }}
        </span>
        <span class="duration">{{ formatDuration((video as Mv).duration) }}</span>
      </div>
    </div>
    <div class="title single-line-ellipsis">
      <span
        :title="(video as Mv).name"
        @click="router.push({ name: 'mv', params: { id: (video as Mv).id } })"
      >{{ (video as Mv).name }}</span>
    </div>
  </div>
  <div class="video-item-wrap" v-else>
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${(video as MvBrief).cover}?param=300y160)`}"
        @click="router.push({ name: 'mv', params: { id: (video as MvBrief).id } })"
      >
        <span class="play-count">
          <i class="iconfont icon-play"
          ></i>&nbsp;{{ formatCount((video as MvBrief).playCount) }}
        </span>
      </div>
    </div>
    <div class="title single-line-ellipsis">
      <span
        :title="(video as MvBrief).name"
        @click="router.push({ name: 'mv', params: { id: (video as MvBrief).id } })"
      >{{ (video as MvBrief).name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount, formatDuration } from '@/utils/format'
import type { Mv, MvBrief, VideoBrief } from '@/assets/types/video'
import { useRouter } from 'vue-router'

defineProps<{
  type: 'video' | 'mv' | 'artistMv'
  video: VideoBrief | Mv | MvBrief
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
