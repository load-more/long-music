<template>
  <div>
    <span class="song-count">为您找到 {{ songCount }} 首歌词</span>
    <div class="music-list-wrap">
      <MusicLyricItem
        v-for="(song) in songs"
        :key="song.id"
        :song-info="song"
        :song-index="0"
        :is-playlist-item="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { songType } from '@/assets/ts/type'
import { resolveSearchSongsDetail } from '@/utils/resolve'
import MusicLyricItem from '@/components/music/MusicLyricItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const songs = ref<songType[]>([])
const songCount = ref(0)

const getData = async () => {
  const { data } = await getSearchResult({
    type: 1006,
    keywords: keyword.value || '',
  })
  songs.value = resolveSearchSongsDetail(data.result.songs)
  songCount.value = data.result.songCount
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.song-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
.music-list-wrap {
  .item:nth-child(2n) {
    background-color: $item-bg-color;
  }
  .item:nth-child(2n - 1) {
    background-color: $bg-color-4;
  }
  .item:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .item:hover {
    background-color: $item-hover-bg-color;
  }
  .item:last-child:hover {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>
