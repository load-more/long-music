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
          @keydown.esc.prevent="popperVisible = false"
          @keyup.prevent="handleInput"
          @keydown.down.prevent="handlePressDown"
          @keydown.up.prevent="handlePressUp"
          @keydown.enter.prevent="handlePressEnter"
        >
          <template #prefix v-if="defaultKeyword">
            <i class="iconfont icon-search" @click="handleSearch()"></i>
          </template>
        </el-input>
      </template>
      <el-scrollbar class="scroll-bar" ref="scrollbarRef">
        <div class="search-board-wrap" v-if="!keyword">
          <div class="search-history" v-if="historyList.length">
            <span class="label">
              <i class="iconfont icon-history"></i>
              <span>搜索历史</span>
              <i
                class="iconfont icon-remove"
                @click.stop="dialogVisible = true"
              ></i>
            </span>
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
            <span class="label">
              <i class="iconfont icon-hot"></i>
              <span>热门搜索</span>
            </span>
            <div
              v-for="(item, index) in hotSearchList"
              :key="index"
              class="item search-item"
              :class="{ active: activeHotIndex === index }"
              @click.stop="handleSearch(item.searchWord)"
            >
              <span class="index">{{ index + 1 }}</span>
              <div class="right single-line-ellipsis">
                <div class="title">
                  <span class="word">{{ item.searchWord }}</span>
                  <span class="score">{{ item.score }}</span>
                  <img :src="`${item.iconUrl}?param=13y15`" v-if="item.iconUrl">
                </div>
                <div class="content single-line-ellipsis" v-if="item.content">
                  <span>{{ item.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="search-suggest-wrap">
          <div
            v-for="(type, index) in suggestType"
            :key="index"
          >
            <span
              class="label search-item"
              :class="type"
              @click.stop="handleSearch()"
            >
              <i :class="`iconfont icon-${typeIcon[type]}`"></i>
              <span class="label-content">{{ typeLabel[type] }}</span>
            </span>
            <div v-if="type === 'songs'">
              <div
                v-for="(item) in typeContent.songs"
                class="item songs search-item single-line-ellipsis"
                :key="item.id"
                :title="`${item.name} - ${item.artists}`"
                @click.stop="handleEnterItem('song', item.id)"
              >
                <span>{{ item.name }}</span>
                <span v-if="item.alias" class="alias">（{{ item.alias }}）</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ item.artists }}</span>
              </div>
            </div>
            <div v-if="type === 'artists'">
              <div
                v-for="(item) in typeContent.artists"
                class="item artists search-item single-line-ellipsis"
                :key="item.id"
                :title="`${item.name}`"
                @click.stop="handleEnterItem('artist', item.id)"
              >
                <span>{{ item.name }}</span>
                <span v-if="item.alias">({{ item.alias }})</span>
              </div>
            </div>
            <div v-if="type === 'albums'">
              <div
                v-for="(item) in typeContent.albums"
                class="item albums search-item single-line-ellipsis"
                :key="item.id"
                :title="`${item.name} - ${item.artists}`"
                @click.stop="handleEnterItem('album', item.id)"
              >
                <span>{{ item.name }}</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ item.artists }}</span>
              </div>
            </div>
            <div v-if="type === 'playlists'">
              <div
                v-for="(item) in typeContent.playlists"
                class="item playlists search-item single-line-ellipsis"
                :key="item.id"
                :title="`${item.name}`"
                @click.stop="handleEnterItem('playlist', item.id)"
              >
                <span>{{ item.name }}</span>
                <span v-if="item.trackCount" class="alias">（{{ item.trackCount }}首）</span>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import {
  ref, onBeforeMount, computed, watch,
} from 'vue'
import { getSearchKeyword, getHotSearch, getSearchSuggest } from '@/api/search'
import {
  getSearchHistory,
  addSearchHistory,
  removeSearchHistory,
  clearSearchHistory,
} from '@/utils/storage'
import { useRouter } from 'vue-router'
import type { ElScrollbar } from 'element-plus'
import { searchSuggestType } from '@/assets/ts/type'
import { getMusicDetail } from '@/api/music'
import { resolveSongsDetail } from '@/utils/resolve'
import useMusicStore from '@/store/music'

const keyword = ref('')
const defaultKeyword = ref('')
const realKeyword = ref('')
const hotSearchList = ref()
const historyList = ref(getSearchHistory())
const dialogVisible = ref(false)
const popperVisible = ref(false)
const router = useRouter()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const isSearched = ref(false)

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
  // 关闭 popover
  isSearched.value = true
  popperVisible.value = false
  if (word) {
    keyword.value = word
  }
  if (!keyword.value) {
    keyword.value = realKeyword.value
  }
  // 跳转页面
  router.push({ name: 'search', query: { kw: keyword.value } })
  // 添加历史记录
  addSearchHistory(keyword.value)
  historyList.value = getSearchHistory()
}

const handleClearHistory = () => {
  historyList.value = []
  clearSearchHistory()
  dialogVisible.value = false
}
const handleRemoveHistory = (kw: string) => {
  removeSearchHistory(kw)
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

const suggestType = ref()
const typeLabel = {
  songs: '单曲',
  artists: '歌手',
  albums: '专辑',
  playlists: '歌单',
}
const typeIcon = {
  songs: 'single-song',
  artists: 'artist',
  albums: 'album',
  playlists: 'playlist',
}
const typeContent = ref<searchSuggestType>({
  songs: [],
  artists: [],
  albums: [],
  playlists: [],
})

const debounce = (fn: () => void, wait: number) => {
  let timer: NodeJS.Timeout | null = null
  return () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn()
    }, wait)
  }
}

const handleInput = debounce(async () => {
  if (!keyword.value) return
  const { data } = await getSearchSuggest({ keywords: keyword.value })
  if (!data.result.order) return
  typeContent.value = {
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
  }
  suggestType.value = data.result.order
  data.result.order.forEach((type: string) => {
    const arr: any = []
    if (type === 'songs') {
      data.result[type].forEach((item: any) => {
        arr.push({
          id: item.id,
          name: item.name,
          alias: item.alias[0],
          artists: item.artists.map((artist: any) => artist.name).join(' / '),
        })
      })
      typeContent.value.songs = arr
    } else if (type === 'artists') {
      data.result[type].forEach((item: any) => {
        arr.push({
          id: item.id,
          name: item.name,
          alias: item.alias[0],
        })
      })
      typeContent.value.artists = arr
    } else if (type === 'albums') {
      data.result[type].forEach((item: any) => {
        arr.push({
          id: item.id,
          name: item.name,
          artists: item.artist.name,
        })
      })
      typeContent.value.albums = arr
    } else if (type === 'playlists') {
      data.result[type].forEach((item: any) => {
        arr.push({
          id: item.id,
          name: item.name,
          trackCount: item.trackCount,
        })
      })
      typeContent.value.playlists = arr
    }
  })
}, 100)

const activeHotIndex = ref(-1)
const activeSuggestIndex = ref(-1)
const suggestItemLen = computed(() => Object.values(typeContent.value)
  .reduce((p: number, c: any) => p + c.length, suggestType.value.length))

watch(keyword, () => {
  if (!isSearched.value) {
    popperVisible.value = true
  }
  isSearched.value = false
  activeHotIndex.value = -1
  activeSuggestIndex.value = -1
})

const scrollItem = (index: number) => {
  const searchItemEl = scrollbarRef.value?.scrollbar$
    ?.getElementsByClassName('search-item')[index] as HTMLElement
  /*
    显示尾行需要滚动的距离 scrollLen = itemEl.offsetTop + itemEl.height - boxEl.height
    其中，itemEl.height = 40px, boxEl.height = 450px
  */
  const scrollLen = searchItemEl.offsetTop - 410
  // 滚动
  scrollbarRef.value?.setScrollTop(scrollLen)
}

const updateSearchItem = () => {
  // 获取元素组
  const searchItemEls = (scrollbarRef.value?.scrollbar$ as HTMLElement)?.getElementsByClassName('search-item')
  // 转换成数组
  const elsArr = Array.from(searchItemEls)
  if (elsArr.length) {
    // 清除所有 active 的项
    elsArr.forEach((el) => {
      el.classList.remove('active')
    })
    // 找到要激活的项并激活
    const searchItemEl = searchItemEls[activeSuggestIndex.value] as HTMLElement
    searchItemEl.classList.add('active')
  }
}

const handlePressDown = () => {
  if (!keyword.value) {
    if (hotSearchList.value.length) {
      activeHotIndex.value = (activeHotIndex.value + 1) % hotSearchList.value.length
      scrollItem(activeHotIndex.value)
    }
  } else if (suggestItemLen.value) {
    // 移动索引
    activeSuggestIndex.value = (activeSuggestIndex.value + 1) % suggestItemLen.value
    // 更新激活项的样式
    updateSearchItem()
    // 滚动页面
    scrollItem(activeSuggestIndex.value)
  }
}

const handlePressUp = () => {
  if (!keyword.value) {
    if (hotSearchList.value.length) {
      if (activeHotIndex.value === -1) {
        activeHotIndex.value = hotSearchList.value.length - 1
      } else {
        activeHotIndex.value = (activeHotIndex.value - 1 + hotSearchList.value.length)
        % hotSearchList.value.length
      }
      scrollItem(activeHotIndex.value)
    }
  } else if (suggestItemLen.value) {
    // 移动索引
    if (activeSuggestIndex.value === -1) {
      activeSuggestIndex.value = suggestItemLen.value - 1
    } else {
      activeSuggestIndex.value = (activeSuggestIndex.value - 1 + suggestItemLen.value)
      % suggestItemLen.value
    }
    updateSearchItem()
    scrollItem(activeSuggestIndex.value)
  }
}

const handleEnterItem = async (type: 'song' | 'artist' | 'album' | 'playlist', id: number) => {
  popperVisible.value = false
  if (type === 'song') {
    const { data } = await getMusicDetail({ ids: id })
    const song = resolveSongsDetail(data)[0]
    await useMusicStore().updateCurrentSong(song)
    useMusicStore().playMusic()
  } else {
    router.push({ name: type, params: { id } })
  }
}

const handlePressEnter = () => {
  if (!keyword.value) {
    if (activeHotIndex.value === -1) {
      handleSearch()
    } else {
      handleSearch(hotSearchList.value[activeHotIndex.value].searchWord)
    }
  } else if (activeSuggestIndex.value === -1) {
    handleSearch(keyword.value)
  } else {
    // 获取元素组
    const searchItemEls = (scrollbarRef.value?.scrollbar$ as HTMLElement)?.getElementsByClassName('search-item')
    // 转换成数组
    const elsArr = Array.from(searchItemEls)
    if (elsArr.length) {
      const searchItemEl = searchItemEls[activeSuggestIndex.value] as HTMLElement
      const checkClass = (class1: string, class2?: string) => {
        if (class2) {
          return searchItemEl.classList.contains(class1) && searchItemEl.classList.contains(class2)
        }
        return searchItemEl.classList.contains(class1)
      }
      const getItem = (index: number) => {
        let count = 0
        for (let i = 0, len = Object.keys(typeContent.value).length; i < len; i += 1) {
          if (count === index) return Object.keys(typeContent.value)[i]
          count += 1
          for (let j = 0, len2 = typeContent.value[Object.keys(typeContent.value)[i]].length;
            j < len2; j += 1) {
            if (count === index) return typeContent.value[Object.keys(typeContent.value)[i]][j]
            count += 1
          }
        }
        return null
      }
      if (checkClass('songs', 'item')) {
        // 播放单曲
        const item = getItem(activeSuggestIndex.value)
        handleEnterItem('song', item.id)
      } else if (checkClass('artists', 'item')) {
        // 跳转到歌手页
        const item = getItem(activeSuggestIndex.value)
        handleEnterItem('artist', item.id)
      } else if (checkClass('albums', 'item')) {
        // 跳转到专辑页
        const item = getItem(activeSuggestIndex.value)
        handleEnterItem('album', item.id)
      } else if (checkClass('playlists', 'item')) {
        // 跳转到歌单页
        const item = getItem(activeSuggestIndex.value)
        handleEnterItem('playlist', item.id)
      } else if (checkClass('songs')) {
        // 搜索单曲
        handleSearch()
      } else if (checkClass('artists')) {
        // 搜索歌手
        handleSearch()
      } else if (checkClass('albums')) {
        // 搜索专辑
        handleSearch()
      } else if (checkClass('playlists')) {
        // 搜索歌单
        handleSearch()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search-input-wrap {
  display: flex;
  align-items: center;
  .el-input {
    width: 250px;
    border-radius: 10px;
    border: 1px solid transparent;
    transition: all .25s ease;
    &:hover {
      background-color: rgba(#000, .25);
      border-color: rgba(#fff, .15);
    }
    :deep .el-input__inner {
      background-color: transparent;
      &::-webkit-input-placeholder {
        color: $font-color;
      }
      &:-moz-placeholder {
        color: $font-color;
      }
      &:-ms-input-placeholder {
        color: $font-color;
      }
    }
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
}
</style>
