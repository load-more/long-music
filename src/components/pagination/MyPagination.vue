<template>
  <div class="pagination-wrap">
    <div class="content" v-show="!isLoading">
      <keep-alive>
        <slot :page-map="pageMap" :current-page="currentPage"></slot>
      </keep-alive>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        v-model:current-page="currentPage"
        @current-change="handleCurrentPageChange"
        hide-on-single-page
      >
      </el-pagination>
    </div>
    <RoundSpinner class="loading-animation" v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import RoundSpinner from '@/components/loading/RoundSpinner.vue'

const props = defineProps<{
  pageSize: number
  total: number
  pageData: any[]
}>()
const emit = defineEmits(['getPage'])

const currentPage = ref(1)
const pageMap = ref(new Map())
const isLoading = ref(false)

watch(() => props.pageData, () => {
  isLoading.value = false
  pageMap.value.set(currentPage.value - 1, props.pageData)
}, { immediate: true })

const handleCurrentPageChange = () => {
  // 如果 Map 中已有该页数据，则不做处理
  if (pageMap.value.has(currentPage.value - 1)) return
  // 否则，发送事件请求该页数据
  isLoading.value = true
  emit('getPage', currentPage.value - 1)
}
</script>

<style scoped lang="scss">
.pagination-wrap {
  .content {
    .pagination {
      display: flex;
      justify-content: center;
    }
  }
  .loading-animation {
    font-size: 3px;
    padding: 20px 0;
  }
}
</style>
