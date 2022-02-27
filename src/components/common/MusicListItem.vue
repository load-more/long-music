<template>
  <div class="music-list-item-wrap" @dblclick="handleDbClick" :class="{ 'active': isActive }">
    <div class="pc hidden-xs-only">
      <div class="operation">
        <span v-if="!isActive">{{ songIndex }}</span>
        <i v-else-if="currentSong.isPlay" class="iconfont icon-volume"></i>
        <i v-else class="iconfont icon-close-volume"></i>
        <i class="iconfont icon-like"></i>
        <i class="iconfont icon-download"></i>
      </div>
      <div
        class="title"
        :title="`${songInfo.name} ${songInfo.alias ? '(' + songInfo.alias + ')' : ''}`"
      >
        <span>{{ songInfo.name }}</span>
        <span v-if="songInfo.alias" class="alias">&nbsp;({{ songInfo.alias }})</span>
      </div>
      <div class="singer" :title="songInfo.author.map(item => item.name).join(' / ')">
        <span v-for="(item, index) in songInfo.author" :key="item.id">
          <span class="name">
            {{ item.name }}
          </span>
          <span class="seperator" v-if="index !== songInfo.author.length - 1">&nbsp;/&nbsp;</span>
        </span>
      </div>
      <div class="album" :title="songInfo.album.name">
        <span>{{ songInfo.album.name }}</span>
      </div>
      <div class="duration">
        <span>{{ formatDuration(songInfo.duration) }}</span>
      </div>
    </div>
    <div class="mobile hidden-sm-and-up">
      <div class="left">
        <div class="operation">
          <span v-if="!isActive">{{ songIndex }}</span>
          <i v-else-if="currentSong.isPlay" class="iconfont icon-volume"></i>
          <i v-else class="iconfont icon-close-volume"></i>
        </div>
      </div>
      <div class="mid">
        <div
          class="title single-line-ellipsis"
          :title="`${songInfo.name} ${songInfo.alias ? '(' + songInfo.alias + ')' : ''}`"
        >
          <span>{{ songInfo.name }}</span>
          <span v-if="songInfo.alias" class="alias">&nbsp;({{ songInfo.alias }})</span>
        </div>
        <div
          class="singer single-line-ellipsis"
          :title="songInfo.author.map(item => item.name).join(' / ')"
        >
          <span v-for="(item, index) in songInfo.author" :key="item.id">
            <span class="name">
              {{ item.name }}
            </span>
            <span class="seperator" v-if="index !== songInfo.author.length - 1">&nbsp;/&nbsp;</span>
          </span>
          <span> - </span>
          <span>{{ songInfo.album.name }}</span>
        </div>
      </div>
      <div class="right">
        <i class="iconfont icon-play"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { formatDuration } from '@/utils/time'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'
import emitter from '@/utils/emitter'

export interface songType {
  id: number
  name: string
  alias: string
  author: { id: number, name: string }[]
  album: { name: string }
  duration: number
  index?: number
}
interface Props {
  songInfo: songType
  songIndex: number
  isPlaylistItem: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isPlaylistItem: true,
})

/* 双击播放音乐 */
const { currentSong, listenedSongSet, currentSongList } = storeToRefs(useMainStore())
const handleDbClick = () => {
  const index = currentSongList.value.findIndex((item) => item.id === currentSong.value.id)
  currentSong.value = props.songInfo
  if (props.isPlaylistItem) { // 如果是歌单里的歌曲，直接切换整个播放列表
    // 清空已听歌曲索引，并将点击的歌曲的 id 加入
    listenedSongSet.value = new Set()
    listenedSongSet.value.add(props.songInfo.id)
    emitter.emit('onChangeCurrentPlaylist', true)
  } else { // 如果是搜索结果里的歌曲，则添加单曲到播放列表里
    listenedSongSet.value.add(props.songInfo.id)
    currentSongList.value.splice(index + 1, 0, currentSong.value)
  }
}

/* 判断当前音乐是否播放 */
const isActive = computed(() => props.songInfo.id === currentSong.value.id)
</script>

<style scoped lang="scss">
.music-list-item-wrap {
  .pc {
    display: flex;
    background-color: rgb(206, 206, 206);
    color: rgb(43, 43, 43);
    font-size: 14px;
    padding: 10px 0;
    border-radius: 5px;
    margin-bottom: 5px;
    line-height: 20px;
    cursor: default;
    &:hover {
      background-color: rgb(184, 184, 184);
    }
    .operation {
      width: 100px;
      color: gray;
      span, i {
        display: inline-block;
        box-sizing: border-box;
        width: 30px;
        text-align: center;
      }
      .icon-volume, .icon-close-volume {
        color: red;
      }
      .icon-like, .icon-download {
        cursor: pointer;
        &:hover {
          color: white;
        }
      }
    }
    .title {
      .alias {
        color: gray;
      }
    }
    .singer {
      .name:hover {
        cursor: pointer;
        color: white;
      }
    }
    .album {
      span:hover {
        cursor: pointer;
        color: white;
      }
    }
    .title, .singer, .album {
      flex: 1;
      box-sizing: border-box;
      padding-left: 4px;
    }
    .duration {
      width: 70px;
      color: gray;
      text-align: center;
    }
    .title, .singer, .album {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 768px) {
    .mobile {
      display: flex;
      align-items: center;
      background-color: rgb(206, 206, 206);
      color: rgb(43, 43, 43);
      font-size: 14px;
      padding: 10px 0;
      border-radius: 5px;
      margin-bottom: 5px;
      line-height: 20px;
      cursor: default;
      &:hover {
        background-color: rgb(184, 184, 184);
      }
      .operation {
        width: 40px;
        text-align: center;
        color: gray;
        span, i {
          display: inline-block;
          box-sizing: border-box;
          width: 30px;
          text-align: center;
        }
        .icon-volume, .icon-close-volume {
          color: red;
        }
        .icon-like, .icon-download {
          cursor: pointer;
          &:hover {
            color: white;
          }
        }
      }
      .mid {
        width: 70%;
        overflow: hidden;
        .title {
          font-size: 16px;
          font-weight: bold;
        }
        .singer {
          font-size: 13px;
          color: gray;
        }
      }
      .right {
        flex: 1;
        text-align: center;
        color: gray;
      }
    }
  }
}
.active {
  background-color: rgb(255, 166, 166);
}
</style>
