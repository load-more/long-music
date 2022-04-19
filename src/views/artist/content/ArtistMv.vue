<template>
  <div class="mv-list-wrap">
    <MvItem
      v-for="(mv) in mvs"
      :key="mv.id"
      :mv="mv"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import MvItem from '@/components/mv/MvItem.vue'
import { getArtistMv } from '@/api/artist'
import { mvType } from '@/assets/ts/type'
import { resolveMvs } from '@/utils/resolve'

const props = defineProps<{
  id: number
}>()

const mvs = ref<mvType[]>([])

const getData = async () => {
  const { data } = await getArtistMv({ id: props.id })
  mvs.value = resolveMvs(data.mvs)
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
