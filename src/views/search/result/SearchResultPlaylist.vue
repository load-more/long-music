<template>
  <div>
    <span class="playlist-count">为您找到 {{ playlistCount }} 张歌单</span>
    <MyPagination
      :page-size="pageSize"
      :total="playlistCount"
      :page-data="pageData"
      @get-page="getPage"
      #default="{ currentPage, pageMap }"
    >
      <div class="item-wrap">
        <PlaylistItem
          class="item"
          v-for="(playlist) in pageMap.get(currentPage - 1)"
          :key="playlist.id"
          :info="playlist"
        />
      </div>
    </MyPagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import MyPagination from '@/components/pagination/MyPagination.vue'
import PlaylistItem from '@/components/playlist/PlaylistItem.vue'
import { SearchPlaylist } from '@/assets/types/playlist'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})

const playlistCount = ref(0)
const pageSize = ref(30)
const pageData = ref<SearchPlaylist[]>([])

const getPage = async (offset: number) => {
  const { data } = await getSearchResult({
    type: 1000,
    keywords: keyword.value || '',
    limit: pageSize.value,
    offset: pageSize.value * offset,
  })
  pageData.value = data.result.playlists
  playlistCount.value = data.result.playlistCount
}

onBeforeMount(() => {
  getPage(0)
})
</script>

<style scoped lang="scss">
.playlist-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
