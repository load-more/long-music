<template>
  <div class="video-view-container">
    <el-scrollbar class="scrollbar" v-show="!isLoading">
      <div class="inset-container">
        <div class="video-container">
          <span class="label">视频详情</span>
          <VideoPlayer :video="(videoUrl as videoUrlType)" />
          <VideoDetail
            type="video"
            :detail="(videoDetail as videoDetailType)"
          />
          <CommentsCpn type="video" :id="id" />
        </div>
        <div class="related-video-container">
          <span class="label">相关推荐</span>
          <VideoRelated :videos="relatedVideos" />
        </div>
      </div>
    </el-scrollbar>
    <WaveSpinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import {
  getVideoUrl,
  getVideoDetail,
  getRelatedVideos,
} from '@/api/video'
import {
  resolveVideoUrl,
  resolveVideoDetail,
  resolveBriefVideos,
} from '@/utils/resolve'
import type {
  videoUrlType,
  videoDetailType,
  videoType,
} from '@/assets/ts/type'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import VideoDetail from '@/components/video/VideoDetail.vue'
import VideoRelated from '@/components/video/VideoRelated.vue'
import CommentsCpn from '@/components/comments/CommentsCpn.vue'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'

const route = useRoute()
const id = String(route.params.id)
const videoUrl = ref<videoUrlType>()
const videoDetail = ref<videoDetailType>()
const relatedVideos = ref<videoType[]>([])
const isLoading = ref(false)

const getData = async () => {
  const { data: urlData } = await getVideoUrl({ id })
  videoUrl.value = resolveVideoUrl(urlData.urls[0])
  const { data: detailData } = await getVideoDetail({ id })
  videoDetail.value = resolveVideoDetail(detailData.data)
  const { data: relatedVideoData } = await getRelatedVideos({ id })
  relatedVideos.value = resolveBriefVideos(relatedVideoData.data)
}

onBeforeMount(async () => {
  isLoading.value = true
  await getData()
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.video-view-container {
  width: 100%;
  height: 100%;
  .scrollbar {
    width: 100%;
    .inset-container {
      width: 100%;
      display: flex;
      .video-container {
        padding: 20px;
        width: 700px;
      }
      .related-video-container {
        overflow: hidden;
        padding: 20px;
      }
      .label {
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
        color: $font-color;
        padding-bottom: 10px;
      }
    }
  }
}
</style>
