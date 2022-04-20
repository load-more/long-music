<template>
  <div class="mv-container">
    <el-scrollbar>
      <div class="video-container">
        <span class="label">MV 详情</span>
        <VideoPlayer :video="(mvUrl as videoUrlType)" />
        <VideoDetail :detail="(mvDetail as mvDetailType)" :data="(mvData as mvDataType)" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getMvUrl, getMvDetail, getMvData } from '@/api/video'
import { resolveMvUrl, resolveMvDetail, resolveMvData } from '@/utils/resolve'
import type { videoUrlType, mvDetailType, mvDataType } from '@/assets/ts/type'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import VideoDetail from '@/components/video/VideoDetail.vue'

const route = useRoute()
const id = Number(route.params.id)
const mvUrl = ref<videoUrlType>()
const mvDetail = ref<mvDetailType>()
const mvData = ref<mvDataType>()

const getData = async () => {
  const { data: urlData } = await getMvUrl({ id })
  mvUrl.value = resolveMvUrl(urlData.data)
  const { data: detailData } = await getMvDetail({ mvid: id })
  mvDetail.value = resolveMvDetail(detailData.data)
  const { data: countData } = await getMvData({ mvid: id })
  mvData.value = resolveMvData(countData)
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.mv-container {
  height: 100%;
  .video-container {
    padding: 20px;
    width: 700px;
    .label {
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      color: $font-color;
      padding-bottom: 10px;
    }
  }
}
</style>
