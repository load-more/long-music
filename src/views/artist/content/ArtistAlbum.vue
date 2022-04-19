<template>
  <div>
    <AlbumItem
      v-for="(item) in albums"
      :key="item.id"
      :album="item"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import AlbumItem from '@/components/album/AlbumItem.vue'
import { getArtistAlbum } from '@/api/artist'
import { albumDetailType } from '@/assets/ts/type'
import { resolveAlbums } from '@/utils/resolve'

const props = defineProps<{
  id: number
}>()

const albums = ref<albumDetailType[]>([])

const getData = async () => {
  const { data } = await getArtistAlbum({ id: props.id })
  albums.value = resolveAlbums(data.hotAlbums)
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">

</style>
