<template>
  <div>
    <span class="video-count">为您找到 {{ videoCount }} 个视频</span>
    <div class="item-wrap">
      <VideoItem
        v-for="(video) in videos"
        :key="video.vid"
        :video="video"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { videoType } from '@/assets/ts/type'
import { resolveVideos } from '@/utils/resolve'
import VideoItem from '@/components/video/VideoItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const videos = ref<videoType[]>([])
const videoCount = ref(0)

const getData = async () => {
  const { data } = await getSearchResult({
    type: 1014,
    keywords: keyword.value || '',
  })
  videos.value = resolveVideos(data.result.videos)
  videoCount.value = data.result.videoCount
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.video-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
.item-wrap {
  display: flex;
}
</style>
