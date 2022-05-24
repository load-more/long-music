<template>
  <div class="video-wrap">
    <video
      class="video"
      :src="video?.url"
      :width="width"
      controls
    ></video>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { MvUrl, VideoUrl } from '@/assets/types/video'

withDefaults(defineProps<{
  width?: number
  video: MvUrl | VideoUrl
}>(), {
  width: 700,
})

</script>

<style scoped lang="scss">

</style>
