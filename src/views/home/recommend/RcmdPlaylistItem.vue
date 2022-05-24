<template>
  <div class="rcmd-playlist-item-wrap">
    <div class="image-wrap">
      <div
        class="image image-inset-shadow"
        :style="{'background-image': `url(${info.picUrl}?param=300y300)`}"
        @click="handleClickPlaylist"
      >
        <div class="play-count">
          <i class="iconfont icon-play"></i>
          <span>{{ formatCount(info.playcount) }}</span>
        </div>
        <div class="play-icon">
          <i class="iconfont icon-play-circle"></i>
        </div>
      </div>
    </div>
    <div class="title">
      <span @click="handleClickPlaylist">{{ info.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatCount } from '@/utils/format'
import { RecommendPlaylist } from '@/assets/types/home'

const props = defineProps<{
  info: RecommendPlaylist
}>()

const router = useRouter()

const handleClickPlaylist = () => {
  router.push({ name: 'playlist', params: { id: props.info.id } })
}
</script>

<style scoped lang="scss">
.rcmd-playlist-item-wrap {
  width: 20%;
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 992px) {
    width: 25%;
  }
  @media screen and (max-width: 768px) {
    width: 33.3%;
  }
  .image-wrap {
    margin-right: 20px;
    .image {
      position: relative;
      height: 0;
      padding-top: 100%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      border-radius: 10px;
      cursor: pointer;
      &:hover .play-icon {
        opacity: 1;
      }
      .play-count {
        color: white;
        position: absolute;
        top: 2px;
        left: 5px;
      }
      .play-icon {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        i {
          font-size: 30px;
          vertical-align: middle;
          color: $theme-color-1;
          &:hover {
            color: $theme-color-2;
          }
        }
        &:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
    }
  }
  .title {
    box-sizing: border-box;
    padding-right: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    font-size: 14px;
    line-height: 20px; // 一行文字高度
    height: 40px; // 固定为两行文字高度
    // 两行内容省略
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    span {
      @include hover-font;
      cursor: pointer;
    }
  }
}
</style>
