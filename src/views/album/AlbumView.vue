<template>
  <div class="album-container">
    <el-scrollbar class="scrollbar" v-show="!isLoading">
      <div class="album-profile-container">
        <AlbumProfile :album="(album as albumDetailType)" />
      </div>
      <div class="album-content-container">
        <AlbumContent :id="id" :songs="albumSongs" :album-desc="album?.description || ''" />
      </div>
    </el-scrollbar>
    <LoadingAnimation v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getAlbumDetail } from '@/api/album'
import { resolveAlbumDetail, resolveSearchSongsDetail } from '@/utils/resolve'
import type { albumDetailType, songType } from '@/assets/ts/type'
import LoadingAnimation from '@/components/loading/LoadingAnimation.vue'
import AlbumProfile from './profile/AlbumProfile.vue'
import AlbumContent from './content/AlbumContent.vue'

const route = useRoute()

const id = Number(route.params.id)
const album = ref<albumDetailType>()
const albumSongs = ref<songType[]>([])
const isLoading = ref(false)

const getData = async () => {
  const { data } = await getAlbumDetail({ id })
  album.value = resolveAlbumDetail(data.album)
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
