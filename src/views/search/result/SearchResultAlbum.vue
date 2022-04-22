<template>
  <div>
    <span class="album-count">为您找到 {{ albumCount }} 张专辑</span>
    <MyPagination
      :page-size="pageSize"
      :total="albumCount"
      :page-data="pageData"
      @get-page="getPage"
      #default="{ currentPage, pageMap }"
    >
      <div>
        <AlbumItem
          v-for="(album) in pageMap.get(currentPage - 1)"
          :key="album.id"
          :album="album"
        />
      </div>
    </MyPagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { resolveAlbums } from '@/utils/resolve'
import MyPagination from '@/components/pagination/MyPagination.vue'
import AlbumItem from '@/components/album/AlbumItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})

const albumCount = ref(0)
const pageSize = ref(30)
const pageData = ref()

const getPage = async (offset: number) => {
  const { data } = await getSearchResult({
    type: 10,
    keywords: keyword.value || '',
    offset: pageSize.value * offset,
    limit: pageSize.value,
  })
  pageData.value = resolveAlbums(data.result.albums)
  albumCount.value = data.result.albumCount
}

onBeforeMount(() => {
  getPage(0)
})
</script>

<style scoped lang="scss">
.album-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
