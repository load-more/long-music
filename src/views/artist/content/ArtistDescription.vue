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
import { artistDescType } from '@/assets/ts/type'
import { resolveArtistDesc } from '@/utils/resolve'
import { getArtistDesc } from '@/api/artist'

const props = defineProps<{
  id: number
}>()

const desc = ref<artistDescType[]>([])

const getData = async () => {
  const { data } = await getArtistDesc({ id: props.id })
  desc.value = resolveArtistDesc(data.introduction)
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
