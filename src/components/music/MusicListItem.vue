<template>
  <div class="music-list-item-wrap" @dblclick="handleDbClick" :class="{ 'active': isActive }">
    <div class="pc hidden-xs-only">
      <div class="operation">
        <span v-if="!isActive" class="index">{{ songIndex }}</span>
        <i v-if="!isActive" @click="handleDbClick" class="iconfont icon-play-hollow"></i>
        <i v-else-if="currentSong.isPlay" class="iconfont icon-volume"></i>
        <i v-else class="iconfont icon-close-volume"></i>
        <i class="iconfont icon-like"></i>
        <i class="iconfont icon-download"></i>
      </div>
      <div class="title">
        <span
          class="single-line-ellipsis"
          :title="`${songInfo.name} ${songInfo.alias ? '(' + songInfo.alias + ')' : ''}`"
        >
          <span
            :style="{ color: songInfo.canPlay ? 'unset' : 'gray' }"
          >{{ songInfo.name }}</span>
          <span
            class="alias"
            v-if="songInfo.alias.length"
            :style="{ color: songInfo.canPlay ? 'unset' : 'gray' }"
          >&nbsp;({{ songInfo.alias[0] }})</span>
        </span>
        <span class="tag-info">
          <span v-if="!songInfo.noCopyrightInfo.typeDesc">
            <span class="tag" v-if="songInfo.isVip">VIP</span>
            <span class="tag" v-if="songInfo.hasSq">SQ</span>
            <span class="tag mv" v-if="songInfo.mv" @click.stop="handleClickMv">MV</span>
          </span>
          <span v-else>
            <span class="no-copyright-tag">无音源</span>
            <span class="no-copyright-text">{{ songInfo.noCopyrightInfo.typeDesc }}</span>
          </span>
        </span>
      </div>
      <div class="singer single-line-ellipsis">
        <span
          v-for="(item, index) in songInfo.artists"
          :key="item.id"
          :title="songInfo.artists.map(item => item.name).join(' / ')"
        >
          <span class="name">
            {{ item.name }}
          </span>
          <span class="seperator" v-if="index !== songInfo.artists.length - 1">&nbsp;/&nbsp;</span>
        </span>
      </div>
      <div class="album single-line-ellipsis">
        <span :title="songInfo.album.name">{{ songInfo.album.name }}</span>
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
          :title="`${songInfo.name} ${songInfo.alias.length ? '(' + songInfo.alias[0] + ')' : ''}`"
        >
          <span>{{ songInfo.name }}</span>
          <span v-if="songInfo.alias.length" class="alias">&nbsp;({{ songInfo.alias[0] }})</span>
        </div>
        <div
          class="singer single-line-ellipsis"
          :title="songInfo.artists.map(item => item.name).join(' / ')"
        >
          <span v-for="(item, index) in songInfo.artists" :key="item.id">
            <span class="name">
              {{ item.name }}
            </span>
            <span
              class="seperator"
              v-if="index !== songInfo.artists.length - 1"
            >&nbsp;/&nbsp;</span>
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
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import emitter from '@/utils/emitter'
import { ElMessage } from 'element-plus'
import { songType } from '@/assets/ts/type'

const props = withDefaults(defineProps<{
  songInfo: songType
  songIndex: number
  isPlaylistItem: boolean
}>(), {
  isPlaylistItem: true,
})

/* 双击播放音乐 */
const { currentSong, listenedSongSet, currentSongList } = storeToRefs(useMusicStore())
const handleDbClick = () => {
  if (!props.songInfo.canPlay) {
    ElMessage({
      type: 'error',
      message: '该歌曲无版权，暂时无法播放',
      appendTo: document.body,
    })
    return
  }
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

const handleClickMv = () => {
  //
}
</script>

<style scoped lang="scss">
.music-list-item-wrap {
  .pc {
    display: flex;
    color: $font-color;
    font-size: 14px;
    padding: 10px 0;
    line-height: 20px;
    cursor: default;
    .operation {
      width: 75px;
      display: flex;
      align-items: center;
      span, i {
        display: inline-block;
        box-sizing: border-box;
        width: 25px;
        text-align: center;
      }
      .icon-volume, .icon-close-volume {
        color: $current-play-icon-color;
      }
      .icon-like, .icon-download, .icon-play-hollow {
        cursor: pointer;
        &:hover {
          color: $font-active-color;
        }
      }
      .icon-play-hollow {
        display: none;
      }
    }
    &:hover .operation {
      .index {
        display: none;
      }
      .icon-play-hollow {
        display: block;
      }
    }
    .title {
      display: flex;
      .alias {
        color: $font-inactive-color;
      }
      .tag-info {
        flex-shrink: 0;
        .tag {
          font-size: 12px;
          color: red;
          border: 1px solid red;
          padding: 0 3px;
          border-radius: 5px;
          margin-left: 5px;
        }
        .no-copyright-tag {
          font-size: 12px;
          color: gray;
          border: 1px solid gray;
          padding: 0 3px;
          border-radius: 5px;
          margin-left: 5px;
        }
        .no-copyright-text {
          font-size: 12px;
          color: gray;
          margin-left: 5px;
        }
        .mv {
          cursor: pointer;
          &:hover {
            color: $font-active-color;
            border-color: $font-active-color;
          }
        }
      }
    }
    .singer {
      .name:hover {
        cursor: pointer;
        color: $font-active-color;
      }
    }
    .album {
      span:hover {
        cursor: pointer;
        color: $font-active-color;
      }
    }
    .title, .singer, .album {
      box-sizing: border-box;
      padding-left: 4px;
    }
    .title {
      flex: 3;
      overflow: hidden;
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
  @media screen and (max-width: 768px) {
    .mobile {
      display: flex;
      align-items: center;
      background-color: $item-bg-color;
      color: $font-color;
      font-size: 14px;
      padding: 10px 0;
      border-radius: 5px;
      margin-bottom: 5px;
      line-height: 20px;
      cursor: default;
      &:hover {
        background-color: $item-hover-bg-color;
      }
      .operation {
        width: 40px;
        text-align: center;
        span, i {
          display: inline-block;
          box-sizing: border-box;
          width: 30px;
          text-align: center;
        }
        .icon-volume, .icon-close-volume {
          color: $current-play-icon-color;
        }
        .icon-like, .icon-download {
          cursor: pointer;
          &:hover {
            color: $font-active-color;
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
        }
      }
      .right {
        flex: 1;
        text-align: center;
      }
    }
  }
}
.active {
  > div {
    background-color: $item-active-bg-color !important;
  }
}
</style>
