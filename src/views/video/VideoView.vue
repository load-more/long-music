<template>
  <div class="video-view-container">
    <el-scrollbar class="scrollbar" v-show="!isLoading">
      <div class="inset-container">
        <div class="video-container">
          <span class="label">视频详情</span>
          <VideoPlayer v-if="videoUrl" :video="videoUrl" />
          <VideoDetail
            type="video"
            v-if="videoDetail"
            :detail="videoDetail"
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
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import VideoDetail from '@/components/video/VideoDetail.vue'
import VideoRelated from '@/components/video/VideoRelated.vue'
import CommentsCpn from '@/components/comments/CommentsCpn.vue'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'
import type {
  VideoBrief,
  VideoDetail as VideoDetailType,
  VideoUrl,
} from '@/assets/types/video'

const route = useRoute()
const id = String(route.params.id)
const videoUrl = ref<VideoUrl>()
const videoDetail = ref<VideoDetailType>()
const relatedVideos = ref<VideoBrief[]>([])
const isLoading = ref(false)

const getData = async () => {
  const { data: urlData } = await getVideoUrl({ id });
  [videoUrl.value] = urlData.urls
  const { data: detailData } = await getVideoDetail({ id })
  videoDetail.value = detailData.data
  const { data: relatedVideoData } = await getRelatedVideos({ id })
  relatedVideos.value = relatedVideoData.data
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
