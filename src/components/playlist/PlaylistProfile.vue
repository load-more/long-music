<template>
  <div class="playlist-profile-wrap">
    <div class="image-wrap">
      <el-image
        class="cover-image"
        :src="state.coverImgUrl"
      />
    </div>
    <div class="info">
      <div class="title">
        <span class="label">歌单</span>
        <span>{{ state.title }}</span>
        <i
          class="iconfont icon-edit"
          v-if="uid === String(state.creatorId)"
          @click="router.push({ name: 'editPlaylist', params: { id: state.playlistId } })"
        ></i>
      </div>
      <div class="creator">
        <span class="name">{{ state.creatorName }}</span>
        <span class="create-time" v-if="state.createTime">创建时间：{{ createTime }}</span>
      </div>
      <div class="controls">
        <el-button type="primary" round>播放全部<i class="iconfont icon-play"></i></el-button>
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
        <div class="song-data">
          <span class="item">
            <span class="label">歌曲：</span>
            <span class="content">{{ state.songCount }}</span>
          </span>
          <span class="item">
            <span class="label">播放量：</span>
            <span class="content">{{ state.playCount }}</span>
          </span>
          <span class="item">
            <span class="label">收藏量：</span>
            <span class="content">{{ state.subscribedCount }}</span>
          </span>
          <span class="item">
            <span class="label">分享量：</span>
            <span class="content">{{ state.shareCount }}</span>
          </span>
        </div>
        <div class="desc" ref="descRef">
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
import { useRoute, useRouter } from 'vue-router'
import {
  onBeforeMount,
  reactive,
  computed,
  ref,
} from 'vue'
import { getPlaylistDetail } from '@/api/playlist'
import { getLocalTime } from '@/utils/time'
import { Decrypt } from '@/utils/secret'
import emitter from '@/utils/emitter'

/* 路由管理 */
const route = useRoute()
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
const uid = Decrypt(String(window.localStorage.getItem('uid')))

onBeforeMount(async () => {
  const { id } = route.params
  const { data: detailData } = await getPlaylistDetail({
    id: Number(id),
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

  emitter.emit('onSendPlaylistMusicCount', state.songCount)
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
  .image-wrap {
    .cover-image {
      width: 200px;
      height: 200px;
      border-radius: 5px;
      margin-right: 20px;
    }
  }
  .info {
    width: 80%;
    display: flex;
    flex-direction: column;
    .title, .creator, .controls {
      padding-bottom: 16px;
    }
    .title {
      font-size: 22px;
      font-weight: bold;
      .label {
        font-size: 13px;
        color: red;
        border: 1px solid red;
        padding: 1px 2px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .icon-edit {
        font-size: 28px;
        font-weight: normal;
        color: gray;
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          color: rgb(189, 189, 189);
        }
      }
    }
    .creator {
      .name {
        font-size: 15px;
        color: blue;
        cursor: pointer;
        margin-right: 10px;
      }
      .create-time {
        font-size: 13px;
        color: gray;
      }
    }
    .song-detail {
      font-size: 15px;
      .label {
        font-weight: 800;
      }
      .content {
        color: gray;
      }
      .tags {
        padding-bottom: 10px;
        .content {
          background-color: rgb(41, 192, 79);
          padding: 1px 5px;
          margin-right: 5px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          &:hover {
            background-color: rgb(98, 226, 130);
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .content {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
