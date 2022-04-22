<template>
  <div class="search-result-music-wrap">
    <span class="music-count">为您找到 {{ count }} 首单曲</span>
    <MyPagination
      :page-size="pageSize"
      :total="count"
      :page-data="pageData"
      @get-page="getPage"
      #default="{ currentPage, pageMap }"
    >
      <div class="music-list-wrap">
        <MusicListItem
          v-for="(song, index) in pageMap.get(currentPage - 1)"
          :key="song.id"
          :song-info="song"
          :song-index="(currentPage - 1) * pageSize + index + 1"
          :is-playlist-item="false"
        />
      </div>
    </MyPagination>
  </div>
</template>

<script setup lang="ts">
import {
  ref, computed, onBeforeMount,
} from 'vue'
import { getSearchResult } from '@/api/search'
import { useRoute } from 'vue-router'
import { resolveSearchSongsDetail } from '@/utils/resolve'
import MyPagination from '@/components/pagination/MyPagination.vue'
import MusicListItem from '@/components/music/MusicListItem.vue'

const emit = defineEmits(['finish-loading'])

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})

const count = ref(0)
const pageSize = ref(100)
const pageData = ref()

const getPage = async (offset: number) => {
  const { data } = await getSearchResult({
    keywords: keyword.value || '',
    limit: pageSize.value,
    offset: pageSize.value * offset,
  })
  count.value = data.result.songCount
  pageData.value = resolveSearchSongsDetail(data.result.songs)
}

onBeforeMount(async () => {
  await getPage(0)
  emit('finish-loading')
})
</script>

<style scoped lang="scss">
.search-result-music-wrap {
  .music-count {
    font-size: 12px;
    color: $font-inactive-color;
    display: inline-block;
    margin-bottom: 10px;
  }
}
</style>
