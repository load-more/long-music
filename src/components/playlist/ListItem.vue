<template>
  <div class="wrap">
    <div class="left">
      <el-image
        class="image"
        :src="info.coverImg"
        fit="fit"
      />
      <span>{{ info.title }}</span>
    </div>
    <div class="right">
      <span>歌曲：{{ info.songCount }}</span>
      <span>创建者：{{ info.creator }}</span>
      <span>收藏量：{{ info.starCount }}</span>
      <span>播放量：{{ info.playCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
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
.wrap {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: rgb(199, 199, 199);
  }
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    .image {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      font-size: 12px;
      // 实现文字一行省略
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
