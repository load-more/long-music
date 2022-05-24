<template>
  <div class="artist-container">
    <el-scrollbar v-show="!isLoading">
      <div class="artist-profile-container">
        <ArtistProfile v-if="artist" :artist="artist" />
      </div>
      <div class="artist-content-container">
        <ArtistContent v-if="hotSongs" :hot-songs="hotSongs" :id="id" />
      </div>
    </el-scrollbar>
    <WaveSpinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getArtist } from '@/api/artist'
import { useRoute } from 'vue-router'
import type { Artist } from '@/assets/types/artist'
import type { Song } from '@/assets/types/song'
import { resolveSearchSongsDetail } from '@/utils/resolve'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'
import ArtistProfile from './profile/ArtistProfile.vue'
import ArtistContent from './content/ArtistContent.vue'

const route = useRoute()
const id = Number(route.params.id)
const artist = ref<Artist>()
const hotSongs = ref<Song[]>()
const isLoading = ref(false)

const getData = async () => {
  const { data } = await getArtist({ id })
  artist.value = data.artist
  hotSongs.value = resolveSearchSongsDetail(data.hotSongs)
}

onBeforeMount(async () => {
  isLoading.value = true
  await getData()
  isLoading.value = false
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
