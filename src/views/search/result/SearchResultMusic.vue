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
      <div class="loader-wrap" v-if="isLoading">
        <LoadingAnimation class="loading-animation" />
      </div>
      <keep-alive>
        <SearchResultMusicList
          :song-arr="pageMap.get(currentPage - 1)"
        />
      </keep-alive>
      <el-pagination
        v-if="!isLoading"
        class="pagination"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="count"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, computed, onBeforeMount,
} from 'vue'
import { getSearchResult } from '@/api/search'
import { useRoute } from 'vue-router'
import { songType } from '@/components/music/MusicListItem.vue'
import LoadingAnimation from '@/components/loading/LoadingAnimation.vue'
import SearchResultMusicList from './SearchResultMusicList.vue'

const emit = defineEmits(['finish-loading'])

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const isLoading = ref(false)
const count = ref(0)
const currentPage = ref(1)
const pageSize = ref(100)
const pageMap = ref(new Map())

const getData = async (offset: number) => {
  if (pageMap.value.has(offset)) return
  isLoading.value = true
  const { data } = await getSearchResult({
    keywords: keyword.value as string,
    limit: pageSize.value,
    offset: pageSize.value * offset,
  })
  count.value = data.result.songCount
  const arr: songType[] = []
  data.result.songs.forEach((item: any, index: number) => {
    const i = offset * pageSize.value + index
    arr.push({
      id: item.id,
      name: item.name,
      alias: item.alia[0],
      author: item.ar,
      album: item.al,
      duration: item.dt,
      index: i,
      mv: item.mv,
      fee: item.privilege.fee,
      maxbr: item.privilege.maxbr,
      st: item.privilege.st,
      noCopyrightRcmd: item.noCopyrightRcmd,
    })
  })
  pageMap.value.set(offset, arr)
  isLoading.value = false
}

onBeforeMount(async () => {
  await getData(currentPage.value - 1)
  emit('finish-loading')
})

const handleCurrentChange = () => {
  getData(currentPage.value - 1)
}
</script>

<style scoped lang="scss">
.search-result-music-wrap {
  .music-count {
    font-size: 12px;
    color: $font-inactive-color;
    display: inline-block;
    margin-bottom: 10px;
  }
  .topbar {
    display: flex;
    font-size: 14px;
    background-color: $item-bg-color;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    > *:hover {
      background-color: $item-hover-bg-color;
    }
    > *:first-child:hover {
      background-color: unset;
    }
    > *:last-child:hover {
      background-color: unset;
    }
    > * span {
      display: inline-block;
      padding: 10px 0;
    }
    .operation {
      width: 75px;
      text-align: center;
    }
    .title, .singer, .album {
      box-sizing: border-box;
      padding-left: 4px;
    }
    .title {
      flex: 3;
    }
    .album {
      flex: 2;
    }
    .singer {
      flex: 1;
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
    .loader-wrap {
      width: 100%;
      height: 40px;
      .loading-animation {
        font-size: 3px;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
