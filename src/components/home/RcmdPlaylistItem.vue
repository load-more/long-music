<template>
  <div class="rcmd-playlist-item-wrap">
    <div class="image-wrap">
      <el-image
        class="image"
        :src="info.picUrl"
      ></el-image>
      <div class="play-icon">
        <i class="iconfont icon-play-circle"></i>
      </div>
    </div>
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
    position: relative;
    .image {
      margin-right: 20px;
      border-radius: 10px;
      cursor: pointer;
      // + 同级控制，~ 子对父控制，不加符号 父对子控制
      &:hover + .play-icon {
        opacity: 1;
      }
    }
    .play-icon {
      background-color: rgba(255, 255, 255, 0.6);
      width: 26px;
      height: 26px;
      border-radius: 50%;
      position: absolute;
      right: 30px;
      bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      i {
        font-size: 30px;
        color: rgb(255, 47, 47);
        vertical-align: middle;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.9);
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  .title {
    box-sizing: border-box;
    padding-right: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    color: gray;
    font-size: 14px;
    cursor: pointer;
    line-height: 20px; // 一行文字高度
    height: 40px; // 固定为两行文字高度
    // 两行内容省略
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &:hover {
      color: rgb(173, 173, 173);
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
