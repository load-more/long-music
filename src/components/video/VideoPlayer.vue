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
import { mvUrlType, videoUrlType } from '@/assets/ts/type'

withDefaults(defineProps<{
  width?: number
  video: mvUrlType | videoUrlType
}>(), {
  width: 700,
})

</script>

<style scoped lang="scss">

</style>
