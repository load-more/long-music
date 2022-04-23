<template>
  <div class="video-detail-wrap">
    <div v-if="type === 'mv'">
      <div class="creator">
        <div
          class="item"
          v-for="(artist) in (detail as mvDetailType)?.artists"
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
        <span>{{ (detail as mvDetailType)?.name }}</span>
      </div>
      <div class="info">
        <span class="publish-time">
          发布：{{ detail?.publishTime }}
        </span>
        <span class="play-count">
          播放：{{ (detail as mvDetailType)?.playCount }}
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
          <i class="iconfont icon-collection"></i>收藏({{ (detail as mvDetailType)
          ?.subCount }})</el-button>
        <el-button round>
          <i class="iconfont icon-share"></i>分享({{ data?.shareCount }})</el-button>
        <el-button round>
          <i class="iconfont icon-download"></i>下载</el-button>
      </div>
    </div>
    <div v-else>
      <div class="creator">
        <div class="item">
          <el-avatar
            class="avatar"
            :src="(detail as videoDetailType)?.creator.avatarUrl"
          ></el-avatar>
          <span class="name">{{ (detail as videoDetailType)?.creator.nickname }}</span>
        </div>
      </div>
      <div class="title">
        <span>{{ (detail as videoDetailType)?.title }}</span>
      </div>
      <div class="info">
        <span class="publish-time">
          发布：{{ detail?.publishTime }}
        </span>
        <span class="play-count">
          播放：{{ (detail as videoDetailType)?.playTime }}
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
          <i class="iconfont icon-thumb-up-line"></i>点赞({{ (detail as videoDetailType)
          ?.praisedCount }})</el-button>
        <el-button round>
          <i class="iconfont icon-collection"></i>收藏({{ (detail as videoDetailType)
          ?.subscribeCount }})</el-button>
        <el-button round>
          <i class="iconfont icon-share"></i>分享({{ (detail as videoDetailType)
          ?.shareCount }})</el-button>
        <el-button round>
          <i class="iconfont icon-download"></i>下载</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { mvDetailType, mvDataType, videoDetailType } from '@/assets/ts/type'

defineProps<{
  type: 'mv' | 'video'
  detail: mvDetailType | videoDetailType
  data?: mvDataType
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
