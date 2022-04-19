<template>
  <div>
    <div class="top50">
      <span class="label">TOP50</span>
      <div class="topbar hidden-xs-only">
        <div class="operation">
          <span>操作</span>
        </div>
        <div class="title">
          <span>标题</span>
        </div>
        <div class="singer">
          <span>歌手</span>
        </div>
        <div class="album">
          <span>专辑</span>
        </div>
        <div class="duration">
          <span>时间</span>
        </div>
      </div>
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

defineProps<{
  hotSongs: songType[]
}>()
</script>

<style scoped lang="scss">
.top50 {
  .topbar {
    display: flex;
    font-size: 14px;
    background-color: $item-bg-color;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    > *:hover {
      background-color: $item-hover-bg-color;
    }
    > *:first-child:hover {
      background-color: unset;
    }
    > *:last-child:hover {
      background-color: unset;
    }
    > * span {
      display: inline-block;
      padding: 10px 0;
    }
    .operation {
      width: 75px;
      text-align: center;
    }
    .title, .singer, .album {
      box-sizing: border-box;
      padding-left: 4px;
    }
    .title {
      flex: 3;
    }
    .album {
      flex: 2;
    }
    .singer {
      flex: 1;
    }
    .duration {
      width: 70px;
      text-align: center;
    }
  }
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
