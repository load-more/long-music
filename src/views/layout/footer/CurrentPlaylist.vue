<template>
  <el-drawer
    v-model="isOpenList"
    custom-class="list-drawer"
    :show-close="false"
    :append-to-body="true"
  >
    <template #title>
      <div class="title-wrap">
        <div class="top">
          <span>当前播放列表</span>
        </div>
        <div class="bottom">
          <span class="song-count">总共 {{ currentSongList.length }} 首</span>
          <span class="clear-all" @click="clearList">清空列表</span>
        </div>
      </div>
    </template>
    <div class="playlist-wrap">
      <el-scrollbar class="scroll-bar">
        <div
          class="item"
          :class="{'active': currentSong.id === item.id}"
          v-for="(item, index) in currentSongList"
          :key="item.id"
          @dblclick="onClickPlay(item)"
        >
          <div class="operation">
            <span v-if="currentSong.id !== item.id" class="index">{{ index + 1 }}</span>
            <i
              v-if="currentSong.id !== item.id"
              class="iconfont icon-play-hollow"
              @click.stop="onClickPlay(item)"
            ></i>
            <i v-else-if="isPlayed" class="iconfont icon-volume"></i>
            <i v-else class="iconfont icon-close-volume"></i>
          </div>
          <div class="title single-line-ellipsis">
            <span :title="`${item.name} ${item.alias.length ? '(' + item.alias[0] + ')' : ''}`">
              <span>{{ item.name }}</span>
              <span v-if="item.alias.length">&nbsp;({{ item.alias[0] }})</span>
            </span>
          </div>
          <div class="singer single-line-ellipsis">
            <span
              v-for="(i, index) in item.artists"
              :key="i.id"
              :title="item.artists.map(i => i.name).join(' / ')"
            >
              <span class="name">
                {{ i.name }}
              </span>
              <span
                class="seperator"
                v-if="index !== item.artists.length - 1"
              >&nbsp;/&nbsp;</span>
            </span>
          </div>
          <div class="duration single-line-ellipsis">
            <span>{{ formatDuration(item.duration) }}</span>
            <i class="iconfont icon-remove" @click="removeSongFromCurrentSongList(item.id)"></i>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import { formatDuration } from '@/utils/format'
import { songType } from '@/assets/ts/type'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

/* 双向绑定 isOpenList */
const isOpenList = ref(props.modelValue)

watch(() => props.modelValue, () => {
  isOpenList.value = props.modelValue
})
watch(isOpenList, () => {
  emit('update:modelValue', isOpenList.value)
})

const musicStore = useMusicStore()
const { currentSongList, currentSong, isPlayed } = storeToRefs(musicStore)
const {
  updateCurrentSong,
  updateCurrentSongList,
  resetCurrentSong,
  playMusic,
  removeSongFromCurrentSongList,
} = musicStore

const clearList = () => {
  updateCurrentSongList(0, [])
  resetCurrentSong()
}

const onClickPlay = async (song: songType) => {
  await updateCurrentSong(song)
  playMusic()
}
</script>

<style scoped lang="scss">

</style>
