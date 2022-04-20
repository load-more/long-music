<template>
  <div>
    <span class="artist-count">为您找到 {{ artistCount }} 个歌手</span>
    <div class="item-wrap">
      <ArtistItem
        class="item"
        v-for="(artist) in artists"
        :key="artist.id"
        :artist="artist"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { artistType } from '@/assets/ts/type'
import { resolveArtists } from '@/utils/resolve'
import ArtistItem from '@/components/artist/ArtistItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const artists = ref<artistType[]>([])
const artistCount = ref(0)

const getData = async () => {
  const { data } = await getSearchResult({
    type: 100,
    keywords: keyword.value || '',
  })
  artists.value = resolveArtists(data.result.artists)
  artistCount.value = data.result.artistCount
}

onBeforeMount(() => {
  getData()
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
