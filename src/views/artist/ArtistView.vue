<template>
  <div class="artist-container">
    <el-scrollbar>
      <div class="artist-profile-container">
        <ArtistProfile :artist="(artist as artistType)" />
      </div>
      <div class="artist-content-container">
        <ArtistContent :hot-songs="(hotSongs as songType[])"/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getArtist } from '@/api/artist'
import { useRoute } from 'vue-router'
import type { artistType, songType } from '@/assets/ts/type'
import { resolveArtist, resolveSearchSongsDetail } from '@/utils/resolve'
import ArtistProfile from './profile/ArtistProfile.vue'
import ArtistContent from './content/ArtistContent.vue'

const route = useRoute()
const id = Number(route.params.id)
const artist = ref<artistType>()
const hotSongs = ref<songType[]>()

const getData = async () => {
  const { data } = await getArtist({ id })
  artist.value = resolveArtist(data.artist)
  hotSongs.value = resolveSearchSongsDetail(data.hotSongs)
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.artist-container {
  height: 100%;
  .artist-profile-container, .artist-content-container {
    padding: 20px;
  }
}
</style>
