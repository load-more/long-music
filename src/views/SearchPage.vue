<template>
  <div class="search-container">
    <el-scrollbar class="scroll-bar">
      <span class="label">
        <span class="left">搜索 </span>
        <span class="keyword">&nbsp;{{ keyword }}&nbsp;</span>
        <span class="left">的结果：</span>
      </span>
      <div class="search-recommend-container">
        <SearchRecommend :keyword="(keyword as string)" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SearchRecommend from '@/components/search/SearchRecommend.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
</script>

<style scoped lang="scss">
.search-container {
  height: 100%;
  .label {
    display: inline-block;
    margin-top: 20px;
    margin-left: 20px;
    .left, .right {
      font-size: 16px;
    }
    .keyword {
      font-size: 20px;
      font-weight: bold;
      color: rgb(185, 17, 17);
    }
  }
  .scroll-bar {
    height: 100%;
  }
  .search-recommend-container {
    padding: 20px;
  }
}
</style>
