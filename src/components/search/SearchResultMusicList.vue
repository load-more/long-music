<template>
  <MusicListItem
    v-for="(item) in songArr"
    :key="item.id"
    :song-info="item"
    :song-index="(item.index as number) + 1"
    :is-playlist-item="false"
  />
</template>

<script setup lang="ts">
import MusicListItem, { songType } from '@/components/common/MusicListItem.vue'

defineProps<{
  songArr: songType[]
}>()
</script>

<style scoped lang="scss">

</style>
