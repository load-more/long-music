<template>
  <div class="album-content-wrap">
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
  .desc {
    white-space: pre-line;
  }
}
</style>
