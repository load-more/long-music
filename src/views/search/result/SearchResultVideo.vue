<template>
  <div>
    <span class="video-count">为您找到 {{ videoCount }} 个视频</span>
    <MyPagination
      :page-size="pageSize"
      :total="videoCount"
      :page-data="pageData"
      @get-page="getPage"
      #default="{ currentPage, pageMap }"
    >
      <div class="item-wrap">
        <VideoItem
          v-for="(video) in pageMap.get(currentPage - 1)"
          :key="video.vid"
          :video="video"
        />
      </div>
    </MyPagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { resolveVideos } from '@/utils/resolve'
import MyPagination from '@/components/pagination/MyPagination.vue'
import VideoItem from '@/components/video/VideoItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})

const videoCount = ref(0)
const pageSize = ref(32)
const pageData = ref()

const getPage = async (offset: number) => {
  const { data } = await getSearchResult({
    type: 1014,
    keywords: keyword.value || '',
    limit: pageSize.value,
    offset: pageSize.value * offset,
  })
  pageData.value = resolveVideos(data.result.videos)
  videoCount.value = data.result.videoCount
}

onBeforeMount(() => {
  getPage(0)
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
  flex-wrap: wrap;
}
</style>
