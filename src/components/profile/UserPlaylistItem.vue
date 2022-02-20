<template>
  <div class="user-playlist-item-wrap">
    <div class="left">
      <el-image
        class="image"
        :src="info.coverImg"
      />
      <div class="title hidden-xs-only" :title="info.title">{{ info.title }}</div>
    </div>
    <div class="right">
      <div class="title hidden-sm-and-up" :title="info.title">{{ info.title }}</div>
      <div class="song-count">
        <span class="label">歌曲：</span>
        <span class="content">{{ info.songCount }}</span>
      </div>
      <div class="creator">
        <span class="label">创建者：</span>
        <span class="content" :title="info.creator">{{ info.creator }}</span>
      </div>
      <div class="star-count hidden-xs-only">
        <span class="label">收藏量：</span>
        <span class="content">{{ formatPlayCount(info.starCount) }}</span>
      </div>
      <div class="play-count">
        <span class="label">播放量：</span>
        <span class="content">{{ formatPlayCount(info.playCount) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPlayCount } from '@/utils/format'

export interface infoType {
  id: number,
  coverImg: string
  title: string
  songCount: number
  creator: string
  starCount: number
  playCount: number
}
defineProps<{
  info: infoType
}>()
</script>

<style scoped lang="scss">
.user-playlist-item-wrap {
  display: flex;
  height: 90px;
  border-radius: 10px;
  border: 1px solid rgb(185, 185, 185);
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(199, 199, 199);
    box-shadow: 0 2px 1px rgb(145, 145, 145);
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
      &:hover {
        color: rgb(68, 68, 68);
      }
    }
  }
  .right {
    width: 50%;
    display: flex;
    align-items: center;
    color: rgb(68, 68, 68);
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
      &:hover {
        color: gray;
      }
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
