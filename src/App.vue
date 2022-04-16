<template>
  <router-view />
</template>

<script setup lang="ts">
import { initTheme } from '@/utils/theme'
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const { currentSong, currentPlaylistId } = storeToRefs(useMusicStore())

/* 当播放歌曲或播放列表改变时，修改 localStorage 的数据 */
watch(() => currentSong.value.id, (newValue) => {
  window.localStorage.setItem('current_song', String(newValue))
})
watch(() => currentPlaylistId.value, (newValue) => {
  window.localStorage.setItem('current_playlist', String(newValue))
})

initTheme()
</script>

<style lang="scss"></style>
