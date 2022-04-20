<template>
  <div>
    <span class="album-count">为您找到 {{ albumCount }} 张专辑</span>
    <AlbumItem
      v-for="(album) in albums"
      :key="album.id"
      :album="album"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { albumDetailType } from '@/assets/ts/type'
import { resolveAlbums } from '@/utils/resolve'
import AlbumItem from '@/components/album/AlbumItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const albums = ref<albumDetailType[]>([])
const albumCount = ref(0)

const getData = async () => {
  const { data } = await getSearchResult({
    type: 10,
    keywords: keyword.value || '',
  })
  albums.value = resolveAlbums(data.result.albums)
  albumCount.value = data.result.albumCount
}

onBeforeMount(() => {
  getData()
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
