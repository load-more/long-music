<template>
  <div class="album-container">
    <el-scrollbar class="scrollbar" v-show="!isLoading">
      <div class="album-profile-container">
        <AlbumProfile v-if="album" :album="album" />
      </div>
      <div class="album-content-container">
        <AlbumContent :id="id" :songs="albumSongs" :album-desc="album?.description || ''" />
      </div>
    </el-scrollbar>
    <WaveSpinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getAlbumDetail } from '@/api/album'
import { resolveSearchSongsDetail } from '@/utils/resolve'
import type { Album } from '@/assets/types/album'
import type { Song } from '@/assets/types/song'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'
import AlbumProfile from './profile/AlbumProfile.vue'
import AlbumContent from './content/AlbumContent.vue'

const route = useRoute()

const id = Number(route.params.id)
const album = ref<Album>()
const albumSongs = ref<Song[]>([])
const isLoading = ref(false)

const getData = async () => {
  const { data } = await getAlbumDetail({ id })
  album.value = data.album
  albumSongs.value = resolveSearchSongsDetail(data.songs)
}
onBeforeMount(async () => {
  isLoading.value = true
  await getData()
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.album-container {
  height: 100%;
  .album-profile-container, .album-content-container {
    padding: 20px;
  }
}
</style>
