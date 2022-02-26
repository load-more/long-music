<template>
  <div class="search-result-music-wrap">
    <span class="music-count">为您找到 {{ count }} 首单曲</span>
    <div class="topbar hidden-xs-only">
      <div class="operation">
        <span>操作</span>
      </div>
      <div class="title">
        <span>标题</span>
      </div>
      <div class="singer">
        <span>歌手</span>
      </div>
      <div class="album">
        <span>专辑</span>
      </div>
      <div class="duration">
        <span>时间</span>
      </div>
    </div>
    <div class="list">
      <LoadingSvg v-if="isLoading" />
      <MusicListItem
        v-for="(item) in songArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        :key="item.id"
        :song-info="item"
        :song-index="(item.index as number) + 1"
      />
      <el-pagination
        v-if="!isLoading"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="count"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, computed, reactive, onBeforeMount,
} from 'vue'
import LoadingSvg from '@/components/common/LoadingSvg.vue'
import { getSearchResult } from '@/api/search'
import MusicListItem, { songType } from '@/components/common/MusicListItem.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const isLoading = ref(false)
const songArr = reactive<songType[]>([])
const count = ref(0)
const currentPage = ref(1)
const pageSize = ref(100)
const offsetSet = new Set()

const getData = async (offset: number) => {
  if (offsetSet.has(offset)) return
  isLoading.value = true
  const { data } = await getSearchResult({
    keywords: keyword.value as string,
    limit: pageSize.value,
    offset,
  })
  count.value = data.result.songCount
  data.result.songs.forEach((item: any, index: number) => {
    const i = offset * pageSize.value + index
    const obj: songType = {
      id: item.id,
      name: item.name,
      alias: item.alia[0],
      author: item.ar,
      album: item.al,
      duration: item.dt,
      index: i,
    }
    songArr.splice(i, 0, obj)
  })
  isLoading.value = false
}

onBeforeMount(() => {
  getData(currentPage.value - 1)
})

const handleCurrentChange = () => {
  getData(currentPage.value - 1)
}
</script>

<style scoped lang="scss">
.search-result-music-wrap {
  .music-count {
    font-size: 12px;
    color: gray;
    display: inline-block;
    margin-bottom: 10px;
  }
  .topbar {
    display: flex;
    font-size: 14px;
    background-color: #adadad;
    border-radius: 5px;
    > *:hover {
      background-color: gray;
      border-radius: 5px;
    }
    > * span {
      display: inline-block;
      padding: 10px 0;
    }
    .operation {
      width: 100px;
      text-align: center;
    }
    .title,
    .singer,
    .album {
      flex: 1;
      box-sizing: border-box;
      padding-left: 4px;
    }
    .duration {
      width: 70px;
      text-align: center;
    }
  }
  .list {
    width: 100%;
    position: relative;
    overflow: hidden;
    .infinite-list {
      position: absolute;
      left: 0;
      top: 0;
      right: -17px;
      bottom: 0;
      overflow-y: scroll;
      height: 400px;
      display: block;
      list-style-type: none;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 0;
    }
  }
}
</style>
