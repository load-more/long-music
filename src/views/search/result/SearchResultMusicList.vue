<template>
  <div class="music-list-wrap">
    <MusicListItem
      class="item"
      v-for="(item) in songArr"
      :key="item.id"
      :song-info="item"
      :song-index="(item.index as number) + 1"
      :is-playlist-item="false"
    />
  </div>
</template>

<script setup lang="ts">
import MusicListItem, { songType } from '@/components/music/MusicListItem.vue'

defineProps<{
  songArr: songType[]
}>()
</script>

<style scoped lang="scss">
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
