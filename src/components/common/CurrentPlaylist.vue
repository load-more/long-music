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
          v-for="(item) in currentSongList"
          :key="item.id"
        >
          <div
            class="title single-line-ellipsis"
            :title="`${item.name} ${item.alias ? '(' + item.alias + ')' : ''}`"
          >
            <span>{{ item.name }}</span>
            <span v-if="item.alias">&nbsp;({{ item.alias }})</span>
          </div>
          <div
            class="singer single-line-ellipsis"
            :title="item.author.map(i => i.name).join(' / ')"
          >
            <span v-for="(i, index) in item.author" :key="i.id">
              <span class="name">
                {{ i.name }}
              </span>
              <span
                class="seperator"
                v-if="index !== item.author.length - 1"
              >&nbsp;/&nbsp;</span>
            </span>
          </div>
          <div class="duration single-line-ellipsis">
            <span>{{ formatDuration(item.duration) }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'
import { formatDuration } from '@/utils/time'
import emitter from '@/utils/emitter'

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

const { currentSongList, currentSong } = storeToRefs(useMainStore())

const clearList = () => {
  currentSongList.value = []
  // 清除当前播放歌曲
  emitter.emit('onRemoveCurrentSong', true)
}
</script>

<style scoped lang="scss">

</style>
