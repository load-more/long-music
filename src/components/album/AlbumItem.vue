<template>
  <div class="album-item-wrap" @click="router.push({ name: 'album', params: { id: album?.id } })">
    <div class="left">
      <el-image
        class="image"
        :src="album?.picUrl"
      />
      <div class="title hidden-xs-only" :title="album?.name">{{ album?.name }}</div>
    </div>
    <div class="right">
      <div class="title hidden-sm-and-up" :title="album?.name">{{ album?.name }}</div>
      <div class="song-count">
        <span class="label">歌曲：</span>
        <span class="content">{{ album?.size }}</span>
      </div>
      <div class="creator">
        <span class="label">歌手：</span>
        <span class="content" :title="album?.artist.name">{{ album?.artist.name }}</span>
      </div>
      <div class="publish-time">
        <span class="label">发行时间：</span>
        <span class="content">{{ publishTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatTimestamp } from '@/utils/format'
import { albumDetailType } from '@/assets/ts/type'
import { useRouter } from 'vue-router'

const props = defineProps<{
  album: albumDetailType
}>()

const router = useRouter()

const publishTime = computed(() => {
  // 将时间戳格式化
  if (props.album.publishTime) {
    const obj = formatTimestamp(props.album.publishTime)
    return `${obj.year}-${obj.month}-${obj.date}`
  }
  return ''
})
</script>

<style scoped lang="scss">
.album-item-wrap  {
  display: flex;
  height: 90px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: $item-color-1;
  color: $font-color;
  cursor: pointer;
  &:hover {
    background-color: $item-hover-color;
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
