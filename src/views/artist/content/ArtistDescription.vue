<template>
  <div
    class="desc-wrap"
    v-for="(item, index) in desc"
    :key="index"
  >
    <span class="title">{{ item.ti }}</span>
    <p class="content">{{ item.txt }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { ArtistDesc } from '@/assets/types/artist'
import { getArtistDesc } from '@/api/artist'

const props = defineProps<{
  id: number
}>()

const desc = ref<ArtistDesc[]>([])

const getData = async () => {
  const { data } = await getArtistDesc({ id: props.id })
  desc.value = data.introduction
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.desc-wrap {
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .content {
    white-space: pre-line;
  }
}
</style>
