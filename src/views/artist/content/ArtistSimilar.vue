<template>
  <div class="artist-list-wrap">
    <ArtistItem
      v-for="(artist) in similarArtists"
      :key="artist.id"
      :artist="artist"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import ArtistItem from '@/components/artist/ArtistItem.vue'
import { getArtistSimi } from '@/api/artist'
import { artistType } from '@/assets/ts/type'
import { resolveArtists } from '@/utils/resolve'

const props = defineProps<{
  id: number
}>()

const similarArtists = ref<artistType[]>([])

const getData = async () => {
  const { data } = await getArtistSimi({ id: props.id })
  similarArtists.value = resolveArtists(data.artists)
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.artist-list-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
