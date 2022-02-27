<template>
  <div class="footer-wrap" :class="{'disabled': !currentSong.id}">
    <div class="overlay"></div>
    <div class="left">
      <div class="song-image-wrap">
        <el-avatar
          :shape="currentSong.album['picUrl'] ? 'square' : 'circle'"
          :size="60"
          :class="currentSong.album['picUrl'] ? 'song-image' : 'image-holder'"
          :src="currentSong.album['picUrl'] || '/album.png'"
        ></el-avatar>
      </div>
      <div class="song-info">
        <div
          class="title"
          v-if="currentSong.name"
        >
          <span
            :title="`${currentSong.name} ${ currentSong.alias ?
            '(' + currentSong.alias + ')' : '' }`"
          >
            <span>{{ currentSong.name }}</span>
            <span v-if="currentSong.alias">&nbsp;({{ currentSong.alias }})</span>
          </span>
          <i class="iconfont icon-like"></i>
        </div>
        <div class="title-holder" v-else>
          <span>匆匆岁月</span>
          <span>余音悠长</span>
        </div>
        <div class="singer">
          <span
            v-for="(item, index) in currentSong.author" :key="item.id"
            :title="currentSong.author.map((item) => item.name).join(' / ')"
          >
            <span class="name">
              {{ item.name }}
            </span>
            <span
              class="seperator"
              v-if="index !== currentSong.author.length - 1"
              >&nbsp;/&nbsp;</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="mid">
      <div class="play-controls">
        <span class="hidden-xs-only">
          <el-tooltip placement="top" :show-arrow="false">
            <template #content>{{ playOrderLabel[playOrderIndex] }}</template>
            <i
              :class="`iconfont icon-${playOrder[playOrderIndex]}`"
              @click="togglePlayOrder"
            ></i>
          </el-tooltip>
        </span>
        <i class="iconfont icon-previous" @click="toggleCurrentMusic(-1)"></i>
        <i
          class="iconfont icon-pause"
          v-if="isPlay"
          @click="toggleMusicPlayStatus"
        ></i>
        <i class="iconfont icon-play" v-else @click="toggleMusicPlayStatus"></i>
        <i class="iconfont icon-next" @click="toggleCurrentMusic(1)"></i>
        <i class="iconfont icon-lyrics hidden-xs-only"></i>
      </div>
      <div class="progress-bar hidden-xs-only">
        <MusicProgressBar
          :duration="duration"
          :current-time="currentTime"
          @update-current-time="handleUpdateCurrentTime"
        />
      </div>
      <div class="mobile-progress-bar hidden-sm-and-up">
        <MusicProgressBar
          :duration="duration"
          :current-time="currentTime"
          :show-label="false"
          @update-current-time="handleUpdateCurrentTime"
        />
      </div>
    </div>
    <div class="right hidden-xs-only">
      <el-popover
        placement="top-start"
        trigger="hover"
        popper-class="volume-popper"
        :show-arrow="false"
      >
        <MusicVolumeBar v-model="volume" />
        <template #reference>
          <i class="iconfont icon-volume"></i>
        </template>
      </el-popover>
      <CurrentPlaylist v-model="isOpenList" />
      <i class="iconfont icon-list" @click="isOpenList = !isOpenList"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MusicProgressBar from '@/components/common/MusicProgressBar.vue'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'
import MusicVolumeBar from '@/components/common/MusicVolumeBar.vue'
import CurrentPlaylist from '@/components/common/CurrentPlaylist.vue'
import emitter from '@/utils/emitter'

const { currentSong, currentSongList, listenedSongSet } = storeToRefs(useMainStore())

/* 是否显示当前播放列表 */
const isOpenList = ref(false)

/* 切换播放模式 */
const playOrder = [
  'order-play',
  'loop',
  'single-loop',
  'random-play',
  'heartbeat',
]
const playOrderLabel = [
  '顺序播放',
  '列表循环',
  '单曲循环',
  '随机播放',
  '心动模式',
]
const playOrderIndex = ref(0)
const ctCache = ref(0) // 缓存 currentTime，防止暂停状态下修改时间后自动播放

const togglePlayOrder = () => {
  playOrderIndex.value = (playOrderIndex.value + 1) % playOrder.length
}

/* 音乐切换上一首或下一首 */
const toggleCurrentMusic = (order: number) => {
  if (!currentSongList.value.length) return
  ctCache.value = 0
  const index = currentSongList.value.findIndex(
    (item) => item.id === currentSong.value.id,
  )
  const currentPlayOrder = playOrder[playOrderIndex.value]

  let newIndex = null
  if (currentPlayOrder === 'random-play') { // 如果是“随机播放”模式
    // 随机生成一个不重复的索引
    newIndex = Math.floor(Math.random() * currentSongList.value.length)
    while (listenedSongSet.value.has(currentSongList.value[newIndex].id)) {
      newIndex = Math.floor(Math.random() * currentSongList.value.length)
    }
  } else { // 如果是其他模式
    // 考虑 index 小于 0 或大于最大长度的情况
    newIndex = (index + order + currentSongList.value.length) % currentSongList.value.length
  }
  // 切换当前歌曲
  currentSong.value = currentSongList.value[newIndex]
  // 将歌曲存入已播放集合中
  listenedSongSet.value.add(currentSong.value.id)
  // 如果集合满了，则清空集合并重新记录
  if (listenedSongSet.value.size === currentSongList.value.length) {
    listenedSongSet.value = new Set()
    listenedSongSet.value.add(currentSong.value.id)
  }
}

/* 音乐播放 */
const music = new Audio()
watch(
  () => currentSong.value.id,
  () => {
    music.src = `https://music.163.com/song/media/outer/url?id=${currentSong.value.id}.mp3`
  },
)
const isPlay = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const volume = ref(100)

// 暂停或播放音乐
const playMusic = () => {
  music.play()
  useMainStore().$patch((state) => {
    // eslint-disable-next-line no-param-reassign
    state.currentSong.isPlay = true
  })
}
const pauseMusic = () => {
  music.pause()
  useMainStore().$patch((state) => {
    // eslint-disable-next-line no-param-reassign
    state.currentSong.isPlay = false
  })
}
// 当音乐文件加载完成，初始化数据
music.addEventListener('canplaythrough', () => {
  duration.value = music.duration
  currentTime.value = music.currentTime
  volume.value = music.volume * 100
  playMusic()
})
// 每当音乐文件的时间更新，则更新 currentTime
music.addEventListener('timeupdate', () => {
  currentTime.value = music.currentTime
  ctCache.value = music.currentTime
})
// 当音乐开始播放
music.addEventListener('play', () => {
  music.currentTime = ctCache.value
  isPlay.value = true
})
// 当音乐暂停
music.addEventListener('pause', () => {
  isPlay.value = false
})
// 当音乐结束
music.addEventListener('ended', () => {
  isPlay.value = false
  ctCache.value = 0
  const currentPlayOrder = playOrder[playOrderIndex.value]
  if (currentPlayOrder === 'order-play' || currentPlayOrder === 'heartbeat') {
    // 如果不是最后一首歌，则直接下一首
    if (currentSong.value.id !== currentSongList.value[currentSongList.value.length - 1].id) {
      toggleCurrentMusic(1)
    }
  } else if (currentPlayOrder === 'single-loop') {
    // 单曲循环播放
    music.play()
  } else { // 如果是“随机播放”或“列表循环”
    toggleCurrentMusic(1)
  }
})
// 切换音乐状态
const toggleMusicPlayStatus = () => {
  if (music.src) {
    if (music.paused) {
      playMusic()
    } else {
      pauseMusic()
    }
  }
}
// 当用户调整进度条后，更新音乐的 currentTime
const handleUpdateCurrentTime = (ct: number) => {
  if (music.paused) {
    ctCache.value = ct
  } else {
    music.currentTime = ct
  }
}
// 控制音量
watch(volume, () => {
  music.volume = volume.value / 100
})

emitter.on('onRemoveCurrentSong', () => {
  currentSong.value = {
    id: 0,
    name: '',
    alias: '',
    author: [],
    album: { name: '' },
    duration: 0,
  }
  isPlay.value = false
  duration.value = 0
  currentTime.value = 0
})
</script>

<style scoped lang="scss">
.footer-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: #000;
  position: relative;
  .overlay {
    display: none;
  }
  .left {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
      width: 70%;
    }
    .song-image-wrap {
      height: 60px;
      margin: 0 10px;
      cursor: pointer;
      .image-holder {
        transition: all 1s ease-in-out;
        &:hover {
          transform: rotateZ(360deg);
        }
      }
    }
    .song-info {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      color: #ddd;
      @media screen and (max-width: 768px) {
        // 由于 flex 元素会脱离文档流，使用 inherit 可以继承原来的宽度
        width: inherit;
      }
      .title {
        font-size: 16px;
        margin-bottom: 10px;
        .icon-like {
          margin-left: 5px;
        }
        span, i {
          cursor: pointer;
        }
      }
      .title-holder {
        font-family: 'yahei';
        display: flex;
        flex-direction: column;
        span:nth-child(1) {
          margin-bottom: 5px;
        }
        // 实现文字扫光效果
        width: 64px;
        position: relative;
        color: #fff;
        overflow: hidden;
        &:after {
          width: 300%;
          height: 100%;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background: -webkit-gradient(
            linear,
            left top,
            right top,
            color-stop(0, rgba(0, 0, 0, 0.7)),
            color-stop(0.4, rgba(0, 0, 0, 0.7)),
            color-stop(0.5, rgba(0, 0, 0, 0)),
            color-stop(0.6, rgba(0, 0, 0, 0.7)),
            color-stop(1, rgba(0, 0, 0, 0.7))
          );
          animation: slide ease-in-out 3s infinite;
        }
        @keyframes slide {
          0% {
            -webkit-transform: translateX(-66.666%);
          }
          100% {
            -webkit-transform: translateX(0);
          }
        }
      }
      .singer {
        font-size: 14px;
        span {
          cursor: pointer;
        }
      }
      .title, .singer {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .mid {
    flex-shrink: 0;
    width: 500px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    @media screen and (max-width: 768px) {
      width: 30%;
    }
    .play-controls {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      i {
        font-size: 16px;
        color: #ddd;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
    .progress-bar {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .mobile-progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  .right {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    i {
      font-size: 16px;
      color: #ddd;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
}
.disabled {
  pointer-events: none;
  .overlay {
    display: block;
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
}
</style>
