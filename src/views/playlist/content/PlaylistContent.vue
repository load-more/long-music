<template>
  <div class="playlist-music-list-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="歌曲列表" name="list">
        <MusicListTopBar />
        <div class="list">
          <MusicListItem
            class="item"
            v-for="(item, index) in songArr"
            :key="item.id"
            :song-info="item"
            :song-index="index + 1"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="commentsCountLabel" name="comment">
        <CommentsCpn type="playlist" :id="uid" @finish-loading="handleFinishLoading" />
      </el-tab-pane>
      <el-tab-pane :label="subscribersCountLabel" name="subscriber">
        <UserRelation type="subscribers" :id="uid" :count="subscribersCount" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  ref, onBeforeMount, computed,
} from 'vue'
import { getPlaylistAllSongs } from '@/api/playlist'
import emitter from '@/utils/emitter'
import useMusicStore from '@/store/music'
import CommentsCpn from '@/components/comments/CommentsCpn.vue'
import MusicListItem from '@/components/music/MusicListItem.vue'
import UserRelation from '@/components/user-relation/UserRelation.vue'
import { songType } from '@/assets/ts/type'
import { resolveSongsDetail } from '@/utils/resolve'
import MusicListTopBar from '@/components/music/MusicListTopBar.vue'

const props = defineProps<{
  uid: number
}>()
const emit = defineEmits(['finish-loading'])

/* 状态管理 */
const musicStore = useMusicStore()
const { updateCurrentSongList } = musicStore

/* 渲染数据 */
const songArr = ref<songType[]>([])

const getData = async () => {
  const { data } = await getPlaylistAllSongs({ id: props.uid })
  songArr.value = resolveSongsDetail(data)
  emit('finish-loading')
}

const commentsCount = ref(0)
const subscribersCount = ref(0)

const commentsCountLabel = computed(() => {
  if (!commentsCount.value) {
    return '评论(0)'
  }
  return `评论(${commentsCount.value})`
})
const subscribersCountLabel = computed(() => {
  if (!subscribersCount.value) {
    return '收藏者(0)'
  }
  return `收藏者(${subscribersCount.value})`
})

const handleFinishLoading = (count: number) => {
  commentsCount.value = count
}

onBeforeMount(async () => {
  await getData()
})
const activeTab = ref('list')

emitter.on('onChangeCurrentPlaylist', () => {
  // 更新播放列表
  updateCurrentSongList(props.uid, songArr.value)
})
emitter.on('onSendPlaylistSubscribers', (count) => {
  subscribersCount.value = count
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
  .list {
    .item:nth-child(2n) {
      background-color: $item-bg-color;
    }
    .item:nth-child(2n - 1) {
      background-color: $bg-color-4;
    }
    .item:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .item:hover {
      background-color: $item-hover-bg-color;
    }
    .item:last-child:hover {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
