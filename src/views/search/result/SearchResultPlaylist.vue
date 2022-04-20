<template>
  <div>
    <span class="playlist-count">为您找到 {{ playlistCount }} 张歌单</span>
    <div class="item-wrap">
      <PlaylistItem
        class="item"
        v-for="(playlist) in playlists"
        :key="playlist.id"
        :info="playlist"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { playlistDetailType } from '@/assets/ts/type'
import { resolvePlaylistDetail } from '@/utils/resolve'
import PlaylistItem from '@/components/playlist/PlaylistItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const playlists = ref<playlistDetailType[]>([])
const playlistCount = ref(0)

const getData = async () => {
  const { data } = await getSearchResult({
    type: 1000,
    keywords: keyword.value || '',
  })
  data.result.playlists.forEach((playlist: any) => {
    playlists.value.push(resolvePlaylistDetail(playlist))
  })
  playlistCount.value = data.result.playlistCount
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.playlist-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
