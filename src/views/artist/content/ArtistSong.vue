<template>
  <div>
    <div class="top50">
      <span class="label">TOP50</span>
      <MusicListTopBar />
      <div class="list">
        <MusicListItem
          class="item"
          v-for="(item, index) in hotSongs"
          :key="item.id"
          :song-info="item"
          :song-index="index + 1"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicListItem from '@/components/music/MusicListItem.vue'
import { Song } from '@/assets/types/song'
import MusicListTopBar from '@/components/music/MusicListTopBar.vue'

defineProps<{
  hotSongs: Song[]
}>()
</script>

<style scoped lang="scss">
.top50 {
  .list {
    .item:nth-child(2n) {
      background-color: $item-color-1;
    }
    .item:nth-child(2n - 1) {
      background-color: $item-color-2;
    }
    .item:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .item:hover {
      background-color: $item-hover-color;
    }
    .item:last-child:hover {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
