<template>
  <div class="mv-container">
    <el-scrollbar>
      <div class="video-container">
        <span class="label">MV 详情</span>
        <VideoPlayer :video="(mvUrl as videoUrlType)" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getMvUrl } from '@/api/video'
import { resolveMvUrl } from '@/utils/resolve'
import type { videoUrlType } from '@/assets/ts/type'
import VideoPlayer from '@/components/video/VideoPlayer.vue'

const route = useRoute()
const id = Number(route.params.id)
const mvUrl = ref<videoUrlType>()

const getData = async () => {
  const { data } = await getMvUrl({ id })
  mvUrl.value = resolveMvUrl(data.data)
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
    width: 500px;
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
