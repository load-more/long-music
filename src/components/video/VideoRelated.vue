<template>
  <div class="related-video-wrap">
    <div
      class="item"
      v-for="(video) in videos"
      :key="video.vid"
    >
      <div class="left">
        <div class="image-wrap">
          <el-image
            class="image"
            :src="video?.coverUrl"
          ></el-image>
          <span class="play-count">
            <i class="iconfont icon-play"></i>
            {{ video?.playTime }}
          </span>
          <span class="duration">{{ formatDuration(video?.durationms) }}</span>
        </div>
      </div>
      <div class="right">
        <div class="title two-lines-ellipsis">
          <span>{{ video?.title }}</span>
        </div>
        <div class="creator two-lines-ellipsis">
          <span>by:&nbsp;</span>
          <span
            v-for="(creator, index) in video?.creator"
            :key="creator.userId"
          >
            <span>{{ creator.userName }}</span>
            <span v-if="index !== video.creator.length - 1">&nbsp;/&nbsp;</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDuration } from '@/utils/format'
import type { videoType } from '@/assets/ts/type'

defineProps<{
  videos: videoType[]
}>()
</script>

<style scoped lang="scss">
.related-video-wrap {
  color: $font-color;
  .item {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .left {
      margin-right: 10px;
      .image-wrap {
        width: 150px;
        position: relative;
        font-size: 13px;
        .image {
          border-radius: 5px;
        }
        .play-count {
          position: absolute;
          top: 5px;
          right: 5px;
          i {
            font-size: 12px;
          }
        }
        .duration {
          position: absolute;
          bottom: 5px;
          right: 5px;
        }
      }
    }
    .right {
      overflow: hidden;
      font-size: 14px;
      .creator {
        color: gray;
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
}
</style>
