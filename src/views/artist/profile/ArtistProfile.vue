<template>
  <div class="artist-profile-wrap">
    <div class="image-wrap">
      <el-image
        class="cover-image"
        :src="`${artist.img1v1Url}?param=200y200`"
      />
    </div>
    <div class="info">
      <div class="title single-line-ellipsis">
        <span>{{ artist.name }}</span>
      </div>
      <div class="alias single-line-ellipsis">
        <span v-for="(item, index) in artist.alias" :key="index">
          <span>{{ item }}</span>
          <span v-if="index !== artist.alias.length - 1">&nbsp;/&nbsp;</span>
        </span>
      </div>
      <div class="controls single-line-ellipsis">
        <el-button class="primary-btn" round>收藏<i class="iconfont icon-collection"></i></el-button>
      </div>
      <div class="song-detail">
        <div class="song-data single-line-ellipsis">
          <span class="item">
            <span class="label">单曲：</span>
            <span class="content">{{ artist.musicSize }}</span>
          </span>
          <span class="item">
            <span class="label">专辑：</span>
            <span class="content">{{ artist.albumSize }}</span>
          </span>
          <span class="item">
            <span class="label">MV：</span>
            <span class="content">{{ artist.mvSize }}</span>
          </span>
        </div>
        <div class="desc single-line-ellipsis" ref="descRef">
          <span class="label">简介：</span>
          <span
            class="content"
            @click="toggleReadMore"
          >{{ artist.briefDesc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Artist } from '@/assets/types/artist'

defineProps<{
  artist: Artist
}>()

/* 点击介绍查看更多 */
const descRef = ref<HTMLElement | null>(null)
const isDescDetail = ref(false)
const toggleReadMore = () => {
  isDescDetail.value = !isDescDetail.value
  if (isDescDetail.value) {
    descRef.value!.style.whiteSpace = 'normal'
  } else {
    descRef.value!.style.whiteSpace = 'nowrap'
  }
}
</script>

<style scoped lang="scss">
.artist-profile-wrap {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  color: $font-color;
  .image-wrap {
    .cover-image {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
  .info {
    flex: 1;
    overflow: hidden;
    .title, .alias, .controls {
      padding-bottom: 20px;
    }
    .controls i {
      padding-left: 5px;
    }
    .title {
      width: 100%;
      min-width: 0;
      font-size: 22px;
      font-weight: bold;
    }
    .song-detail {
      margin-top: 20px;
      font-size: 15px;
      .label {
        color: $label-color;
        font-weight: 800;
      }
      .content {
        color: $font-color;
      }
      .song-data {
        padding-bottom: 10px;
        .item {
          padding-right: 10px;
        }
      }
    }
    .desc {
      width: 100%;
      .content {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    .image-wrap {
      width: 100%;
      text-align: center;
      .cover-image {
        width: 40%;
        height: auto;
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
    .info {
      .title, .alias, .controls, .song-data {
        overflow: auto;
        text-overflow: unset;
        white-space: normal;
      }
      .controls {
        display: flex;
        flex-wrap: wrap;
        > * {
          flex: 1;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
