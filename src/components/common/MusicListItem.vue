<template>
  <div class="music-list-item-wrap" @dblclick="handleDbClick" :class="{ 'active': isActive }">
    <div class="operation">
      <span v-if="!isActive">{{ songIndex }}</span>
      <i v-else-if="currentSong.isPlay" class="iconfont icon-volume"></i>
      <i v-else class="iconfont icon-close-volume"></i>
      <i class="iconfont icon-like"></i>
      <i class="iconfont icon-download"></i>
    </div>
    <div
      class="title"
      :title="`${songInfo.name} ${currentSong.alias ? '(' + currentSong.alias + ')' : ''}`"
    >
      <span>{{ songInfo.name }}</span>
      <span v-if="songInfo.alias" class="alias">&nbsp;({{ songInfo.alias }})</span>
    </div>
    <div class="singer" :title="songInfo.author.map(item => item.name).join(' / ')">
      <span v-for="(item, index) in songInfo.author" :key="item.id">
        <span class="name">
          {{ item.name }}
        </span>
        <span class="seperator" v-if="index !== songInfo.author.length - 1">&nbsp;/&nbsp;</span>
      </span>
    </div>
    <div class="album" :title="songInfo.album.name">
      <span>{{ songInfo.album.name }}</span>
    </div>
    <div class="duration">
      <span>{{ formatDuration(songInfo.duration) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDuration } from '@/utils/time'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'

export interface songType {
  id: number
  name: string
  alias: string
  author: { id: number, name: string }[]
  album: { name: string }
  duration: number
}
const props = defineProps<{
  songInfo: songType
  songIndex: number
}>()

/* 双击播放音乐 */
const { currentSong } = storeToRefs(useMainStore())
const handleDbClick = () => {
  currentSong.value = props.songInfo
}

/* 判断当前音乐是否播放 */
const isActive = computed(() => props.songInfo.id === currentSong.value.id)
</script>

<style scoped lang="scss">
.music-list-item-wrap {
  display: flex;
  background-color: rgb(206, 206, 206);
  color: rgb(43, 43, 43);
  font-size: 14px;
  padding: 5px 0;
  line-height: 20px;
  cursor: default;
  &:hover {
    background-color: rgb(184, 184, 184);
  }
  .operation {
    // width: 100px;
    // display: flex;
    // justify-content: space-evenly;
    color: gray;
    span, i {
      display: inline-block;
      box-sizing: border-box;
      width: 30px;
      text-align: center;
    }
    .icon-volume, .icon-close-volume {
      color: red;
    }
    .icon-like, .icon-download {
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
  .title {
    flex: 1;
    .alias {
      color: gray;
    }
  }
  .singer {
    flex: 1;
    .name:hover {
      cursor: pointer;
      color: white;
    }
  }
  .album {
    flex: 1;
    span:hover {
      cursor: pointer;
      color: white;
    }
  }
  .duration {
    width: 70px;
    color: gray;
  }
  .title, .singer, .album {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.active {
  background-color: rgb(255, 166, 166);
}
</style>
