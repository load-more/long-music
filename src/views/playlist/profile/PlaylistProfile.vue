<template>
  <div class="playlist-profile-wrap">
    <div class="image-wrap">
      <el-image
        class="cover-image"
        :src="state.coverImgUrl"
      />
    </div>
    <div class="info">
      <div class="title single-line-ellipsis">
        <span class="label">歌单</span>
        <span>{{ state.title }}</span>
        <i
          class="iconfont icon-edit"
          v-if="uid === state.creatorId"
          @click="router.push({ name: 'editPlaylist', params: { id: state.playlistId } })"
        ></i>
      </div>
      <div class="creator single-line-ellipsis">
        <span class="name">{{ state.creatorName }}</span>
        <span class="create-time" v-if="state.createTime">创建时间：{{ createTime }}</span>
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
            v-for="(item, index) in state.tags"
            :key="index"
          >{{ item }}</span>
        </div>
        <div class="song-data single-line-ellipsis">
          <span class="item">
            <span class="label">歌曲：</span>
            <span class="content">{{ state.songCount }}</span>
          </span>
          <span class="item">
            <span class="label">播放量：</span>
            <span class="content">{{ formatPlayCount(state.playCount) }}</span>
          </span>
          <span class="item">
            <span class="label">收藏量：</span>
            <span class="content">{{ formatPlayCount(state.subscribedCount) }}</span>
          </span>
          <span class="item">
            <span class="label">分享量：</span>
            <span class="content">{{ formatPlayCount(state.shareCount) }}</span>
          </span>
        </div>
        <div class="desc single-line-ellipsis" ref="descRef">
          <span class="label">简介：</span>
          <span
            class="content"
            @click="toggleReadMore"
          >{{ state.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  onBeforeMount,
  reactive,
  computed,
  ref,
} from 'vue'
import { getPlaylistDetail } from '@/api/playlist'
import { getLocalTime } from '@/utils/time'
import { formatPlayCount } from '@/utils/format'

const props = defineProps<{
  uid: number
}>()
const emit = defineEmits(['finish-loading'])

/* 路由管理 */
const router = useRouter()

/* 渲染数据 */
const state = reactive({
  playlistId: 0,
  coverImgUrl: '',
  title: '',
  creatorName: '',
  creatorId: 0,
  createTime: 0,
  tags: [],
  songCount: 0,
  playCount: 0,
  subscribedCount: 0,
  shareCount: 0,
  description: '',
  commentCount: 0,
})
const createTime = computed(() => {
  // 将时间戳格式化
  const obj = getLocalTime(state.createTime)
  return `${obj.year}-${obj.month}-${obj.date}`
})

onBeforeMount(async () => {
  const { data: detailData } = await getPlaylistDetail({
    id: props.uid,
  })
  state.playlistId = detailData.playlist.id
  state.coverImgUrl = detailData.playlist.coverImgUrl
  state.title = detailData.playlist.name
  state.creatorName = detailData.playlist.creator.nickname
  state.creatorId = detailData.playlist.creator.userId
  state.createTime = detailData.playlist.createTime
  state.tags = detailData.playlist.tags
  state.songCount = detailData.playlist.trackCount
  state.playCount = detailData.playlist.playCount
  state.subscribedCount = detailData.playlist.subscribedCount
  state.shareCount = detailData.playlist.shareCount
  state.description = detailData.playlist.description
  state.commentCount = detailData.playlist.commentCount

  emit('finish-loading')
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
.playlist-profile-wrap {
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
      box-shadow: $image-box-shadow;
    }
  }
  .info {
    flex: 1;
    overflow: hidden;
    .title, .creator, .controls {
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
        color: $title-label-color;
        border: 1px solid $title-label-color;
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
    .creator {
      .name {
        color: $creator-label-color;
        font-size: 15px;
        cursor: pointer;
        margin-right: 10px;
      }
      .create-time {
        font-size: 13px;
      }
    }
    .song-detail {
      font-size: 15px;
      .label {
        color: $font-inactive-color;
        font-weight: 800;
      }
      .content {
        color: $font-color;
      }
      .tags {
        padding-bottom: 10px;
        .content {
          background-color: $playlist-tag-color;
          padding: 1px 5px;
          margin-right: 5px;
          border-radius: 10px;
          cursor: pointer;
          &:hover {
            background-color: $playlist-tag-hover-color;
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
      .title, .creator, .controls, .song-data {
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
