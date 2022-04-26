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
import { mvType } from '@/assets/ts/type'
import { resolveArtistMvs } from '@/utils/resolve'

const props = defineProps<{
  id: number
}>()

const mvs = ref<mvType[]>([])

const getData = async () => {
  const { data } = await getArtistMv({ id: props.id })
  mvs.value = resolveArtistMvs(data.mvs)
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
