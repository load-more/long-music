<template>
  <div class="album-content-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="歌曲列表" name="list">
        <MusicListTopBar />
        <div class="list">
          <MusicListItem
            class="item"
            v-for="(item, index) in songs"
            :key="item.id"
            :song-info="item"
            :song-index="index + 1"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="commentsCountLabel" name="comment">
        <CommentsCpn type="album" :id="id" @finish-loading="handleFinishLoading" />
      </el-tab-pane>
      <el-tab-pane label="详情" name="detail">
        <p class="desc">{{ albumDesc }}</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  ref, computed,
} from 'vue'
import emitter from '@/utils/emitter'
import useMusicStore from '@/store/music'
import CommentsCpn from '@/components/comments/CommentsCpn.vue'
import MusicListItem from '@/components/music/MusicListItem.vue'
import { songType } from '@/assets/ts/type'
import MusicListTopBar from '@/components/music/MusicListTopBar.vue'

const props = defineProps<{
  id: number
  songs: songType[]
  albumDesc: string
}>()

/* 状态管理 */
const musicStore = useMusicStore()
const { updateCurrentSongList } = musicStore

const commentsCount = ref(0)

const commentsCountLabel = computed(() => {
  if (!commentsCount.value) {
    return '评论(0)'
  }
  return `评论(${commentsCount.value})`
})

const handleFinishLoading = (count: number) => {
  commentsCount.value = count
}

const activeTab = ref('list')

emitter.on('onChangeCurrentPlaylist', () => {
  // 更新播放列表
  updateCurrentSongList(props.id, props.songs, 2)
})
</script>

<style scoped lang="scss">
.album-content-wrap {
  color: $font-color;
  :deep .el-tabs__header {
    margin: 0;
  }
  :deep .el-tabs__content {
    margin-top: 10px;
  }
  .list {
    .item:nth-child(2n) {
      background-color: $item-color-1;
    }
    .item:nth-child(2n - 1) {
      background-color: $item-color-2;
    }
    .item:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .item:hover {
      background-color: $item-hover-color;
    }
    .item:last-child:hover {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .desc {
    white-space: pre-line;
  }
}
</style>
