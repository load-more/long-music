<template>
  <div class="search-recommend-wrap" v-if="matchResult['orders'].length">
    <span class="label">这些你可能感兴趣哦~</span>
    <div class="content">
      <SearchRecommendItem
        v-for="(item) in matchResult['orders']"
        :key="item"
        :category="item"
        :data="matchResult[item]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getSearchMatch } from '@/api/search'
import SearchRecommendItem from '@/components/search/SearchRecommendItem.vue'

const props = defineProps<{
  keyword: string
}>()
const emit = defineEmits(['finish-loading'])

const matchResult = ref({ orders: [] })

const getData = async () => {
  const { data: matchData } = await getSearchMatch({ keywords: props.keyword })
  matchResult.value = matchData.result
  emit('finish-loading')
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.search-recommend-wrap {
  .label {
    font-size: 12px;
    color: $font-inactive-color;
  }
  .content {
    margin-top: 10px;
    display: flex;
  }
}
</style>
