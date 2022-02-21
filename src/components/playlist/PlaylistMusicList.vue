<template>
  <div class="playlist-music-list-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="歌曲列表" name="list">
        <div class="topbar">
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
          <MusicListItem
            v-for="(item, index) in songArr"
            :key="item.id"
            :song-info="item"
            :song-index="index + 1"
          />
          <LoadingSvg v-if="isLoading" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="comment"> Comments </el-tab-pane>
      <el-tab-pane label="收藏者" name="subscriber"> Subscribers </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  ref, reactive, onBeforeMount, onUnmounted, watch,
} from 'vue'
import MusicListItem, { songType } from '@/components/common/MusicListItem.vue'
import { getPlaylistAllSongs } from '@/api/playlist'
import { useRoute } from 'vue-router'
import emitter from '@/utils/emitter'
import LoadingSvg from '@/components/common/LoadingSvg.vue'

const emit = defineEmits(['after-load-all'])

/* 路由管理 */
const route = useRoute()

/* 渲染数据 */
const songCount = ref<null | number>(null)
const isRequesting = ref(false)
const { id } = route.params
const offset = ref(0)
const limit = 20
const isLoading = ref(false)
const songArr = reactive<songType[]>([])

const getData = async (lim: number, offs: number) => {
  const { data } = await getPlaylistAllSongs({
    id: Number(id),
    limit: lim,
    offset: offs,
  })
  data.songs.forEach((item: any) => {
    const obj: songType = {
      id: item.id,
      name: item.name,
      alias: item.alia[0],
      author: item.ar,
      album: item.al,
      duration: item.dt,
    }
    songArr.push(obj)
  })
}

// 等待 PlaylistProfile 传入 songCount
const waitSongCount = () => new Promise((resolve) => {
  watch(songCount, () => {
    if (songCount.value !== null) {
      resolve(true)
    }
  })
})

/* 加载数据 */
const loadItem = async () => {
  if (!isRequesting.value) { // 避免重复请求相同的数据
    isRequesting.value = true
    isLoading.value = true
    // 之前加载的歌曲数量
    const previousSongs = offset.value * limit
    // 如果还剩最后一组未加载，则加载完之后关闭无限滚动
    if (previousSongs + limit >= songCount.value!) {
      // 如果 offset 超出了最大偏移量，则 offset 重置为最大偏移量
      // 所以 offset 设置为最大安全整数，是获取最后一组数据
      await getData(songCount.value! - previousSongs, Number.MAX_SAFE_INTEGER)
      emit('after-load-all')
    } else {
      await getData(limit, offset.value)
      offset.value += 1
    }
    isRequesting.value = false
    isLoading.value = false
  }
}

onBeforeMount(async () => {
  await waitSongCount()
  await loadItem()
})
const activeTab = ref('list')

emitter.on('onSendPlaylistMusicCount', (count: number) => {
  songCount.value = count
})
emitter.on('onLoadMusicListItem', async () => {
  await loadItem()
})

onUnmounted(() => {
  emitter.off('onSendPlaylistMusicCount')
  emitter.off('onLoadMusicListItem')
})
</script>

<style scoped lang="scss">
.playlist-music-list-wrap {
  .topbar {
    display: flex;
    padding-bottom: 10px;
    .operation {
      width: 100px;
    }
    .title {
      flex: 1;
    }
    .singer {
      flex: 1;
    }
    .album {
      flex: 1;
    }
    .duration {
      width: 70px;
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
