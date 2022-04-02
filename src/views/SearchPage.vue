<template>
  <div class="search-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <span class="label">
        <span class="left">搜索 </span>
        <span class="keyword">&nbsp;{{ keyword }}&nbsp;</span>
        <span class="left">的结果：</span>
      </span>
      <div class="search-recommend-container">
        <SearchRecommend
          :keyword="(keyword as string)"
          v-if="isShowCpn"
          @finish-loading="handleFinishLoading"
        />
      </div>
      <div class="search-result-container">
        <SearchResult
          :keyword="(keyword as string)"
          v-if="isShowCpn"
          @finish-loading="handleFinishLoading"
        />
      </div>
    </el-scrollbar>
    <LoadingAnimation v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import {
  computed, ref, watch, nextTick,
} from 'vue'
import { useRoute } from 'vue-router'
import SearchRecommend from '@/components/search/SearchRecommend.vue'
import SearchResult from '@/components/search/SearchResult.vue'
import LoadingAnimation from '@/components/common/LoadingAnimation.vue'

const route = useRoute()
const isShowCpn = ref(true)
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
watch(() => route.query, () => {
  // 当路由的 query 内容改变，刷新组件
  isShowCpn.value = false
  nextTick(() => {
    isShowCpn.value = true
  })
})

const isLoading = ref(true)
const loadedCount = ref(0)
const handleFinishLoading = () => {
  loadedCount.value += 1
  if (loadedCount.value === 2) {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.search-container {
  height: 100%;
  color: $font-color;
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
      color: $search-keyword-color;
    }
  }
  .scroll-bar {
    height: 100%;
  }
  .search-recommend-container, .search-result-container {
    padding: 20px;
  }
}
</style>
