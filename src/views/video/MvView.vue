<template>
  <div class="mv-container">
    <el-scrollbar class="scrollbar" v-show="!isLoading">
      <div class="inset-container">
        <div class="video-container">
          <span class="label">MV 详情</span>
          <VideoPlayer :video="(mvUrl as mvUrlType)" />
          <VideoDetail
            type="mv"
            :detail="(mvDetail as mvDetailType)"
            :data="(mvData as mvDataType)"
          />
          <CommentsCpn type="mv" :id="id" />
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
  getMvUrl,
  getMvDetail,
  getMvData,
  getRelatedVideos,
} from '@/api/video'
import {
  resolveMvUrl,
  resolveMvDetail,
  resolveMvData,
  resolveBriefVideos,
} from '@/utils/resolve'
import type {
  mvUrlType,
  mvDetailType,
  mvDataType,
  videoType,
} from '@/assets/ts/type'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import VideoDetail from '@/components/video/VideoDetail.vue'
import VideoRelated from '@/components/video/VideoRelated.vue'
import CommentsCpn from '@/components/comments/CommentsCpn.vue'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'

const route = useRoute()
const id = Number(route.params.id)
const mvUrl = ref<mvUrlType>()
const mvDetail = ref<mvDetailType>()
const mvData = ref<mvDataType>()
const relatedVideos = ref<videoType[]>([])
const isLoading = ref(false)

const getData = async () => {
  const { data: urlData } = await getMvUrl({ id })
  mvUrl.value = resolveMvUrl(urlData.data)
  const { data: detailData } = await getMvDetail({ mvid: id })
  mvDetail.value = resolveMvDetail(detailData.data)
  const { data: countData } = await getMvData({ mvid: id })
  mvData.value = resolveMvData(countData)
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
.mv-container {
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
