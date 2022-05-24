<template>
  <div>
    <span class="artist-count">为您找到 {{ artistCount }} 个歌手</span>
    <MyPagination
      :page-size="pageSize"
      :total="artistCount"
      :page-data="pageData"
      @get-page="getPage"
      #default="{ currentPage, pageMap }"
    >
      <div class="item-wrap">
        <ArtistItem
          class="item"
          v-for="(artist) in pageMap.get(currentPage - 1)"
          :key="artist.id"
          :artist="artist"
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
import ArtistItem from '@/components/artist/ArtistItem.vue'
import { Artist } from '@/assets/types/artist'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})

const artistCount = ref(0)
const pageSize = ref(30)
const pageData = ref<Artist[]>([])

const getPage = async (offset: number) => {
  const { data } = await getSearchResult({
    type: 100,
    keywords: keyword.value || '',
    limit: pageSize.value,
    offset: pageSize.value * offset,
  })
  pageData.value = data.result.artists
  artistCount.value = data.result.artistCount
}

onBeforeMount(() => {
  getPage(0)
})
</script>

<style scoped lang="scss">
.artist-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
.item-wrap {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 20%;
  }
}
</style>
