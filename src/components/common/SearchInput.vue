<template>
  <div class="search-input-wrap">
    <el-popover
      v-model:visible="popperVisible"
      placement="bottom"
      trigger="munual"
      :show-arrow="false"
      popper-class="search-popper"
    >
      <template #reference>
        <el-input
          :placeholder="defaultKeyword"
          v-model="keyword"
          @click.stop="popperVisible = true"
        >
          <template #prefix v-if="defaultKeyword">
            <i class="iconfont icon-search" @click="handleSearch()"></i>
          </template>
        </el-input>
      </template>
      <el-scrollbar class="scroll-bar">
        <div class="search-board-wrap">
          <div class="search-history" v-if="historyList.length">
            <span class="label">搜索历史</span>
            <i
              class="iconfont icon-remove"
              @click.stop="dialogVisible = true"
            ></i>
            <el-dialog
              v-model="dialogVisible"
              :show-close="false"
              :append-to-body="true"
              :close-on-click-modal="false"
              custom-class="clear-search-history-dialog"
            >
              <span>确定删除所有历史记录吗？</span>
              <template #footer>
                <el-button class="primary-btn" @click="handleClearHistory"
                >确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
              </template>
            </el-dialog>
           <div class="history-tags">
            <el-tag
              v-for="(history, index) in historyList"
              :key="index"
              @close="handleRemoveHistory(history)"
              closable
              type="plain"
              @click.stop="handleSearch(history)"
            >
              {{ history }}
            </el-tag>
           </div>
          </div>
          <div class="hot-search">
            <span class="label">热门搜索</span>
            <div v-for="(item, index) in hotSearchList" :key="index"
              class="item" @click.stop="handleSearch(item.searchWord)"
            >
              <span class="index">{{ index + 1 }}</span>
              <div class="right">
                <div class="title">
                  <span class="word">{{ item.searchWord }}</span>
                  <span class="score">{{ item.score }}</span>
                  <img :src="item.iconUrl" v-if="item.iconUrl">
                </div>
                <div class="content" v-if="item.content">
                  <span>{{ item.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getSearchKeyword, getHotSearch } from '@/api/search'
import {
  setSearchHistory, getSearchHistory, clearSearchHistory,
  removeHistory,
} from '@/utils/storage'
import { useRouter } from 'vue-router'

const keyword = ref('')
const defaultKeyword = ref('')
const realKeyword = ref('')
const hotSearchList = ref()
const historyList = ref(getSearchHistory())
const dialogVisible = ref(false)
const popperVisible = ref(false)
const router = useRouter()

const getData = async () => {
  // 获取默认搜索关键词
  const { data: keywordData } = await getSearchKeyword()
  defaultKeyword.value = keywordData.data.showKeyword
  realKeyword.value = keywordData.data.realkeyword
  // 获取热搜列表
  const { data: hotSearchData } = await getHotSearch()
  hotSearchList.value = hotSearchData.data
}
onBeforeMount(() => {
  getData()
})

const handleSearch = (word?: string) => {
  if (word) {
    keyword.value = word
  }
  if (!keyword.value) {
    keyword.value = realKeyword.value
  }
  // 跳转页面
  router.push({ name: 'search', query: { kw: keyword.value } })
  // 关闭 popover
  popperVisible.value = false
  // 添加历史记录
  setSearchHistory(keyword.value)
  historyList.value = getSearchHistory()
}

const handleClearHistory = () => {
  historyList.value = []
  clearSearchHistory()
  dialogVisible.value = false
}
const handleRemoveHistory = (kw: string) => {
  removeHistory(kw)
  historyList.value = getSearchHistory()
}
window.addEventListener('click', (event: MouseEvent) => {
  const isClickPopper = document.querySelector('.search-popper')?.contains(event.target as any)
  const isClickOverlay = (event.target as any).className === 'el-overlay-dialog'
  if (isClickPopper || isClickOverlay) {
    popperVisible.value = true
  } else {
    popperVisible.value = false
  }
})
</script>

<style scoped lang="scss">
.search-input-wrap {
  display: flex;
  align-items: center;
  .el-input {
    width: 250px;
    margin-left: 10px;
  }
  .icon-microphone {
    @include hover-font;
    padding-left: 10px;
  }
  .icon-microphone {
    font-size: 24px;
  }
  .icon-search {
    cursor: pointer;
    @include hover-font;
  }
  span {
    cursor: pointer;
  }
}
</style>
