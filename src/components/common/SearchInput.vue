<template>
  <div class="search-input-wrap">
    <el-popover
      placement="bottom"
      trigger="click"
      :show-arrow="false"
      popper-class="search-popper"
    >
      <template #reference>
        <el-input :placeholder="defaultKeyword" v-model="keyword">
          <template #prefix v-if="defaultKeyword">
            <i class="iconfont icon-search" @click.stop="handleSearch"></i>
          </template>
        </el-input>
      </template>
      <el-scrollbar class="scroll-bar">
        <div class="search-board-wrap">
          <div class="search-history">
           <span class="label">搜索历史</span>
           <i class="iconfont icon-remove"></i>
          </div>
          <div class="hot-search">
            <span class="label">热门搜索</span>
            <div v-for="(item, index) in hotSearchList" :key="index" class="item">
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
    <span>
      <i class="iconfont icon-microphone"></i>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
import { getSearchKeyword, getHotSearch } from '@/api/search'

const keyword = ref('')
const defaultKeyword = ref('')
const realKeyword = ref('')
interface hotSearchType {
  searchWord: string
  score: number
  content: string
  iconUrl: string
}
const hotSearchList = reactive<hotSearchType[]>([])
const getData = async () => {
  // 获取默认搜索关键词
  const { data: keywordData } = await getSearchKeyword()
  defaultKeyword.value = keywordData.data.showKeyword
  realKeyword.value = keywordData.data.realkeyword
  // 获取热搜列表
  const { data: hotSearchData } = await getHotSearch()
  hotSearchData.data.forEach((item: any) => {
    const obj: hotSearchType = {
      searchWord: item.searchWord,
      score: item.score,
      content: item.content,
      iconUrl: item.iconUrl,
    }
    hotSearchList.push(obj)
  })
}
onBeforeMount(() => {
  getData()
})

const handleSearch = () => {
  if (!keyword.value) {
    keyword.value = realKeyword.value
  }
}
</script>

<style scoped lang="scss">
.search-input-wrap {
  display: flex;
  align-items: center;
  .el-input {
    width: 100%;
    margin-left: 10px;
  }
  .icon-microphone {
    color: #ddd;
    padding-left: 10px;
    &:hover {
      color: #fff;
    }
  }
  .icon-microphone {
    font-size: 24px;
  }
  .icon-search {
    cursor: pointer;
    color: rgb(75, 75, 75);
    &:hover {
      color: #000;
    }
  }
  span {
    cursor: pointer;
  }
}
</style>
