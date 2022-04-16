<template>
  <div class="user-playlist-item-wrap">
    <div class="left">
      <el-image
        class="image"
        :src="info.coverImgUrl"
      />
      <div class="title hidden-xs-only" :title="info.name">{{ info.name }}</div>
    </div>
    <div class="right">
      <div class="title hidden-sm-and-up" :title="info.name">{{ info.name }}</div>
      <div class="song-count">
        <span class="label">歌曲：</span>
        <span class="content">{{ info.trackCount }}</span>
      </div>
      <div class="creator">
        <span class="label">创建者：</span>
        <span class="content" :title="info.creator.nickname">{{ info.creator.nickname }}</span>
      </div>
      <div class="star-count hidden-xs-only">
        <span class="label">收藏量：</span>
        <span class="content">{{ formatCount(info.subscribedCount) }}</span>
      </div>
      <div class="play-count">
        <span class="label">播放量：</span>
        <span class="content">{{ formatCount(info.playCount) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount } from '@/utils/format'
import { playlistDetailType } from '@/assets/ts/type'

defineProps<{
  info: playlistDetailType
}>()
</script>

<style scoped lang="scss">
.user-playlist-item-wrap {
  display: flex;
  height: 90px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: $item-bg-color;
  color: $font-color;
  cursor: pointer;
  &:hover {
    background-color: $item-hover-bg-color;
  }
  .left {
    box-sizing: border-box;
    width: 50%;
    padding-right: 20px;
    display: flex;
    align-items: center;
    .image {
      // 防止图片被挤压
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 10px;
      margin-right: 20px;
      margin-left: 5px;
      cursor: pointer;
    }
    .title {
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      @include hover-font;
    }
  }
  .right {
    width: 50%;
    display: flex;
    align-items: center;
    > div {
      flex: 1;
      margin-right: 10px;
      font-size: 12px;
      // 实现文字一行省略
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .creator .content {
      cursor: pointer;
      @include hover-font;
    }
  }
  @media screen and (max-width: 768px)  {
    .left {
      width: auto;
      .image {
        margin-right: 0;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      flex: 1;
      .title {
        font-size: 14px;
        font-weight: bold;
      }
      > div {
        // 注意，这里不能用 flex 垂直居中，因为会脱离文档流
        line-height: 22.5px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
