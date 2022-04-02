<template>
  <div class="playlist-music-list-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="歌曲列表" name="list">
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
          <MusicListItem
            v-for="(item, index) in songArr"
            :key="item.id"
            :song-info="item"
            :song-index="index + 1"
          />
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
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['finish-loading'])

/* 路由管理 */
const route = useRoute()

/* 状态管理 */
const { currentSongList } = storeToRefs(useMainStore())

/* 渲染数据 */
const songCount = ref<null | number>(null)
const { id } = route.params
const songArr = reactive<songType[]>([])

const getData = async () => {
  const { data } = await getPlaylistAllSongs({ id: Number(id) })
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
  emit('finish-loading')
}

// 等待 PlaylistProfile 传入 songCount
const waitSongCount = () => new Promise((resolve) => {
  watch(songCount, () => {
    if (songCount.value !== null) {
      resolve(true)
    }
  })
})

onBeforeMount(async () => {
  await waitSongCount()
  await getData()
})
const activeTab = ref('list')

emitter.on('onSendPlaylistMusicCount', (count: number) => {
  songCount.value = count
})
emitter.on('onChangeCurrentPlaylist', () => {
  currentSongList.value = songArr
})

onUnmounted(() => {
  emitter.off('onSendPlaylistMusicCount')
  emitter.off('onChangeCurrentPlaylist')
})
</script>

<style scoped lang="scss">
.playlist-music-list-wrap {
  color: $font-color;
  :deep .el-tabs__header {
    margin: 0;
  }
  :deep .el-tabs__content {
    margin-top: 10px;
  }
  .topbar {
    display: flex;
    font-size: 14px;
    background-color: $item-bg-color;
    border-radius: 5px;
    > *:hover {
      background-color: $item-hover-bg-color;
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
    .title, .singer, .album {
      flex: 1;
      box-sizing: border-box;
      padding-left: 4px;
    }
    .duration {
      width: 70px;
      text-align: center;
    }
  }
}
</style>
