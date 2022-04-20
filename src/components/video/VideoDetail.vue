<template>
  <div class="video-detail-wrap">
    <div class="creator">
      <div
        class="item"
        v-for="(artist) in detail?.artists"
        :key="artist?.id"
      >
        <el-avatar
          class="avatar"
          :src="artist?.img1v1Url"
        ></el-avatar>
        <span class="name">{{ artist?.name }}</span>
      </div>
    </div>
    <div class="title">
      <span>{{ detail?.name }}</span>
    </div>
    <div class="info">
      <span class="publish-time">
        发布：{{ detail?.publishTime }}
      </span>
      <span class="play-count">
        播放：{{ detail?.playCount }}
      </span>
    </div>
    <div class="tags">
      <span
        class="tag"
        v-for="(tag) in detail?.videoGroup"
        :key="tag.id"
      >
        {{ tag?.name }}
      </span>
    </div>
    <div class="btns">
      <el-button round>
        <i class="iconfont icon-thumb-up-line"></i>点赞({{ data?.likedCount }})</el-button>
      <el-button round>
        <i class="iconfont icon-collection"></i>收藏({{ detail?.subCount }})</el-button>
      <el-button round>
        <i class="iconfont icon-share"></i>分享({{ data?.shareCount }})</el-button>
      <el-button round>
        <i class="iconfont icon-download"></i>下载</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { mvDetailType, mvDataType } from '@/assets/ts/type'

defineProps<{
  detail: mvDetailType
  data: mvDataType
}>()
</script>

<style scoped lang="scss">
.video-detail-wrap {
  color: $font-color;
  font-size: 14px;
  padding: 20px 0;
  .creator {
    display: flex;
    .item {
      display: flex;
      align-items: center;
      padding-right: 20px;
      padding-bottom: 20px;
      .name {
        margin: 5px;
      }
    }
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .info {
    color: gray;
    padding-bottom: 10px;
    .publish-time {
      margin-right: 20px;
    }
  }
  .tags {
    padding-bottom: 20px;
    .tag {
      margin-right: 10px;
    }
  }
}
</style>
