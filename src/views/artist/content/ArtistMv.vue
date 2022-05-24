<template>
  <div class="mv-list-wrap">
    <VideoItem
      v-for="(mv) in mvs"
      :key="mv.id"
      type="artistMv"
      :video="mv"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import VideoItem from '@/components/video/VideoItem.vue'
import { getArtistMv } from '@/api/artist'
import { Mv } from '@/assets/types/video'

const props = defineProps<{
  id: number
}>()

const mvs = ref<Mv[]>([])

const getData = async () => {
  const { data } = await getArtistMv({ id: props.id })
  mvs.value = data.mvs
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.mv-list-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
