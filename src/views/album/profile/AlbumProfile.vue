<template>
  <div class="album-profile-wrap">
    <div class="image-wrap">
      <el-image
        class="cover-image"
        :src="`${album?.picUrl}?param=200y200`"
      />
    </div>
    <div class="info">
      <div class="title single-line-ellipsis">
        <span class="label">专辑</span>
        <span>{{ album?.name }}</span>
        <span class="alias" v-if="album?.alias.length">
          （{{ album.alias[0] }}）
        </span>
      </div>
      <div class="artist single-line-ellipsis">
        <span
          class="name"
          @click="router.push({ name: 'artist', params: { id: album.artist.id } })"
        >{{ album?.artist.name }}</span>
        <span class="publish-time" v-if="album?.publishTime">
          <span class="label">
            创建时间：
          </span>
          <span>{{ publishTime }}</span>
        </span>
      </div>
      <div class="controls single-line-ellipsis">
        <el-button class="primary-btn" round>播放<i class="iconfont icon-play-circle"></i></el-button>
        <el-button round>收藏<i class="iconfont icon-collection"></i></el-button>
        <el-button round>分享<i class="iconfont icon-share"></i></el-button>
        <el-button round>下载<i class="iconfont icon-download"></i></el-button>
      </div>
      <div class="song-detail">
        <div class="tags">
          <span class="label">标签：</span>
          <span
            class="content"
            v-if="album?.tags"
          >{{ album.tags }}</span>
        </div>
        <div class="song-data single-line-ellipsis">
          <span class="item">
            <span class="label">歌曲：</span>
            <span class="content">{{ album?.size }}</span>
          </span>
          <span class="item">
            <span class="label">分享：</span>
            <span class="content">{{ album?.shareCount }}</span>
          </span>
        </div>
        <div class="desc single-line-ellipsis" ref="descRef">
          <span class="label">简介：</span>
          <span
            class="content"
            @click="toggleReadMore"
          >{{ album?.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
.album-profile-wrap {
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
    .title, .artist, .controls {
      padding-bottom: 16px;
    }
    .controls i {
      padding-left: 5px;
    }
    .title {
      width: 100%;
      min-width: 0;
      font-size: 22px;
      font-weight: bold;
      .label {
        font-size: 13px;
        color: $type-color;
        border: 1px solid $type-color;
        padding: 1px 2px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .icon-edit {
        font-size: 28px;
        font-weight: normal;
        margin-left: 10px;
        cursor: pointer;
        @include hover-font;
      }
    }
    .artist {
      .name {
        @include user-name-color;
        font-size: 15px;
        margin-right: 10px;
      }
      .publish-time {
        font-size: 13px;
        .label {
          color: $label-color;
        }
      }
    }
    .song-detail {
      font-size: 15px;
      .label {
        color: $label-color;
        font-weight: 800;
      }
      .content {
        color: $font-color;
      }
      .tags {
        padding-bottom: 10px;
        .content {
          background-color: $theme-color-1;
          padding: 1px 5px;
          margin-right: 5px;
          border-radius: 10px;
          cursor: pointer;
          &:hover {
            background-color: $theme-color-2;
          }
        }
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
    .alias {
      color: $font-inactive-color;
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
      .title, .artist, .controls, .song-data {
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
