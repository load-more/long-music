<template>
  <div>
    <span class="song-count">为您找到 {{ songCount }} 首歌词</span>
    <MyPagination
      :page-size="pageSize"
      :total="songCount"
      :page-data="pageData"
      @get-page="getPage"
      #default="{ currentPage, pageMap }"
    >
      <div class="music-list-wrap">
        <MusicLyricItem
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
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { resolveSearchSongsDetail } from '@/utils/resolve'
import MyPagination from '@/components/pagination/MyPagination.vue'
import MusicLyricItem from '@/components/music/MusicLyricItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})

const songCount = ref(0)
const pageSize = ref(30)
const pageData = ref()

const getPage = async (offset: number) => {
  const { data } = await getSearchResult({
    type: 1006,
    keywords: keyword.value || '',
    limit: pageSize.value,
    offset: pageSize.value * offset,
  })
  pageData.value = resolveSearchSongsDetail(data.result.songs)
  songCount.value = data.result.songCount
}

onBeforeMount(() => {
  getPage(0)
})
</script>

<style scoped lang="scss">
.song-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
.music-list-wrap {
  .item:nth-child(2n) {
    background-color: $item-bg-color;
  }
  .item:nth-child(2n - 1) {
    background-color: $bg-color-4;
  }
  .item:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .item:hover {
    background-color: $item-hover-bg-color;
  }
  .item:last-child:hover {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>
