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
import { songType } from '@/assets/ts/type'
import MusicListTopBar from '@/components/music/MusicListTopBar.vue'

defineProps<{
  hotSongs: songType[]
}>()
</script>

<style scoped lang="scss">
.top50 {
  .list {
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
}
</style>
