<template>
  <div class="music-list-item-wrap" @dblclick="handleDbClick" :class="{ 'active': isActive }">
    <div class="pc hidden-xs-only">
      <div class="operation">
        <span v-if="!isActive" class="index">{{ songIndex }}</span>
        <i v-if="!isActive" @click="handleDbClick" class="iconfont icon-play-hollow"></i>
        <i v-else-if="isPlayed" class="iconfont icon-volume"></i>
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
          <span
            class="name"
            @click.stop="router.push({ name: 'artist', params: { id: item.id } })"
          >
            {{ item.name }}
          </span>
          <span class="seperator" v-if="index !== songInfo.artists.length - 1">&nbsp;/&nbsp;</span>
        </span>
      </div>
      <div class="album single-line-ellipsis">
        <span
          :title="songInfo.album.name"
          @click.stop="router.push({ name: 'album', params: { id: songInfo.album.id } })"
        >{{ songInfo.album.name }}</span>
      </div>
      <div class="duration">
        <span>{{ formatDuration(songInfo.duration) }}</span>
      </div>
    </div>
    <div
      class="lyrics-wrap"
      :style="{ height: isFullLyrics ? 'auto' : '100px' }"
    >
      <div class="lyrics">
        <div
          v-for="(item, index) in songInfo?.lyrics"
          :key="index"
          v-html="item"
        ></div>
      </div>
      <div class="btns">
        <el-button
          round
          @click.stop="isFullLyrics = !isFullLyrics"
        >{{ isFullLyrics ? '收起歌词' : '展开歌词' }}</el-button>
        <el-button
          round
          @click.stop="handleClickCopy"
        >复制歌词</el-button>
      </div>
    </div>
    <div class="mobile hidden-sm-and-up">
      <div class="left">
        <div class="operation">
          <span v-if="!isActive">{{ songIndex }}</span>
          <i v-else-if="isPlayed" class="iconfont icon-volume"></i>
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
            <span
              class="name"
              @click.stop="router.push({ name: 'artist', params: { id: item.id } })"
            >
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
import { computed, withDefaults, ref } from 'vue'
import { formatDuration } from '@/utils/format'
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import emitter from '@/utils/emitter'
import { songType } from '@/assets/ts/type'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const props = withDefaults(defineProps<{
  songInfo: songType
  songIndex: number
  isPlaylistItem: boolean
}>(), {
  isPlaylistItem: true,
})

const router = useRouter()
const isFullLyrics = ref(false)

/* 双击播放音乐 */
const musicStore = useMusicStore()
const {
  currentSong,
  isPlayed,
} = storeToRefs(musicStore)
const { updateCurrentSong, playMusic, addSongToCurrentSongList } = musicStore

const handleDbClick = async () => {
  if (props.isPlaylistItem) { // 如果是歌单里的歌曲，直接切换整个播放列表
    // 更新播放列表
    emitter.emit('onChangeCurrentPlaylist', true)
  } else { // 如果是搜索结果里的歌曲，则添加单曲到播放列表里
    addSongToCurrentSongList(props.songInfo)
  }
  // 更新播放歌曲
  await updateCurrentSong(props.songInfo)
  // 播放歌曲
  playMusic()
}

/* 判断当前音乐是否激活 */
const isActive = computed(() => props.songInfo.id === currentSong.value.id)

const handleClickMv = () => {
  router.push({ name: 'mv', params: { id: props.songInfo.mv } })
}

const handleClickCopy = () => {
  // 创建元素用于复制
  const aux = document.createElement('input')
  // 获取复制内容
  const content = props.songInfo.lyrics?.join('') || ''
  // 设置元素内容
  aux.setAttribute('value', content)
  // 将元素插入页面进行调用
  document.body.appendChild(aux)
  // 复制内容
  aux.select()
  // 将内容复制到剪贴板
  document.execCommand('copy')
  // 删除创建元素
  document.body.removeChild(aux)
  ElMessage({
    type: 'success',
    message: '复制成功',
    appendTo: document.body,
  })
}
</script>

<style scoped lang="scss">
.music-list-item-wrap {
  padding-bottom: 10px;
  &:hover {
    background-color: $bg-color-1;
    .pc .operation {
      .index {
        display: none;
      }
      .icon-play-hollow {
        display: block;
      }
    }
  }
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
  .lyrics-wrap {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    line-height: 20px;
    .lyrics {
      margin-left: 80px;
      p {
        white-space: pre-line;
      }
    }
    .btns {
      margin-right: 10px;
    }
  }
}
.active {
  > div {
    background-color: $item-active-bg-color !important;
  }
}
</style>
