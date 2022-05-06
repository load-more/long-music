<template>
  <div class="footer-wrap">
    <div
      class="progress-bar hidden-xs-only"
      v-if="currentSong.id"
    >
      <MusicProgressBar
        :show-label="false"
        :duration="duration"
        :current-time="currentTime"
        @update-current-time="handleUpdateCurrentTime"
      />
    </div>
    <div class="content-wrap">
      <div class="left">
        <div class="song-image-wrap">
          <el-image
            class="cover song-image"
            v-if="currentSong.id"
            :src="`${currentSong.album['picUrl']}?param=50y50`"
            @click="router.push({ name: 'song', params: { id: currentSong.id } })"
          ></el-image>
          <div v-else class="typing-words"><span class="line">匆匆岁月，余音悠长。</span></div>
        </div>
        <div class="song-info">
          <div
            class="title single-line-ellipsis"
            v-if="currentSong.name"
          >
            <span
              :title="`${currentSong.name} ${ currentSong.alias.length ?
              '(' + currentSong.alias[0] + ')' : '' }`"
              @click="router.push({ name: 'song', params: { id: currentSong.id } })"
            >
              <span>{{ currentSong.name }}</span>
              <span v-if="currentSong.alias.length">&nbsp;({{ currentSong.alias[0] }})</span>
            </span>
            <i class="iconfont icon-like"></i>
          </div>
          <div class="singer single-line-ellipsis">
            <span
              v-for="(item, index) in currentSong.artists" :key="item.id"
              :title="currentSong.artists.map((item) => item.name).join(' / ')"
            >
              <span class="name" @click="router.push({ name: 'artist', params: { id: item.id } })">
                {{ item.name }}
              </span>
              <span
                class="seperator"
                v-if="index !== currentSong.artists.length - 1"
              >&nbsp;/&nbsp;</span>
            </span>
          </div>
        </div>
      </div>
      <div class="mid">
        <div v-if="currentSong.id" class="wrap">
          <div class="play-controls">
            <span class="hidden-xs-only">
              <el-tooltip placement="top" :show-arrow="false">
                <template #content>{{ playModeLabel[playModeIndex] }}</template>
                <i
                  :class="`iconfont icon-${playMode[playModeIndex]}`"
                  @click="changePlayMode"
                ></i>
              </el-tooltip>
            </span>
            <i class="iconfont icon-previous" @click="changeSong(-1)"></i>
            <i
              class="iconfont icon-pause"
              v-if="isPlayed"
              @click="pauseMusic"
            ></i>
            <i class="iconfont icon-play" v-else @click="playMusic"></i>
            <i class="iconfont icon-next" @click="changeSong(1)"></i>
            <i class="iconfont icon-lyrics hidden-xs-only"></i>
          </div>
          <div class="lyric-wrap">
            <span>{{ currentLyric }}</span>
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
      </div>
      <div class="right hidden-xs-only">
        <div class="controls-wrap">
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
        <div class="duration-wrap">
          <span>{{ formatDuration(currentTime, 's') }}</span>
          <span>&nbsp;/&nbsp;</span>
          <span>{{ formatDuration(duration, 's') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import { initTheme } from '@/utils/theme'
import { useRouter } from 'vue-router'
import { formatDuration } from '@/utils/format'
import MusicProgressBar from './MusicProgressBar.vue'
import MusicVolumeBar from './MusicVolumeBar.vue'
import CurrentPlaylist from './CurrentPlaylist.vue'

const router = useRouter()

const musicStore = useMusicStore()
const {
  currentSong,
  isPlayed,
  duration,
  currentTime,
  volume,
  playMode,
  playModeLabel,
  playModeIndex,
  currentLyricMap,
  currentLyric,
} = storeToRefs(musicStore)

const {
  playMusic,
  pauseMusic,
  changePlayMode,
  changeCurrentTime,
  changeVolume,
  changeSong,
} = musicStore

/* 是否显示当前播放列表 */
const isOpenList = ref(false)

// 当用户调整进度条后，更新音乐的 currentTime
const handleUpdateCurrentTime = (ct: number) => {
  changeCurrentTime(ct)
}

// 控制音量
watch(volume, () => {
  changeVolume(volume.value)
})

// 初始化主题颜色
onMounted(() => {
  initTheme()
})

// 变换歌词
watch(currentTime, () => {
  const arr = [...currentLyricMap.value.keys()]
  const delta = -0.3 // 时间偏差，使歌词提前或延迟显示
  const newTime = arr.find((item, index) => currentTime.value >= item + delta
    && currentTime.value < arr[index + 1] + delta)
    || (currentTime.value >= arr[arr.length - 1] + delta ? arr[arr.length - 1] : arr[0])
  currentLyric.value = currentLyricMap.value.get(newTime)
})
</script>

<style scoped lang="scss">
.footer-wrap {

  overflow: hidden;
  .progress-bar {
    width: 100%;
    height: 3px;
    position: absolute;
    z-index: 999;
  }
  .content-wrap {
    padding-top: 3px;
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      .mid {
        @include slide-down;
      }
      .right {
        @include slide-down;
      }
    }
    &:not(:hover) {
      .mid {
        @include slide-up;
      }
      .right {
        @include slide-up;
      }
    }
    .left {
      flex: 1;
      overflow: hidden;
      height: 100%;
      display: flex;
      align-items: center;
      @media screen and (max-width: 768px) {
        width: 70%;
      }
      .song-image-wrap {
        height: 100%;
        margin: 0 10px;
        display: flex;
        align-items: center;
        .song-image {
          cursor: pointer;
          border-radius: 6px;
          width: 36px;
          height: 36px;
        }
        .typing-words {
          color: $font-color;
          width: 154px;
          .line {
            display: inline-block;
            border-right: 1px solid transparent;
            font-size: 14px;
            font-family: monospace;
            white-space: nowrap;
            overflow: hidden;
            animation: typing 8s steps(11) infinite alternate, caret 1s infinite;
          }
          @keyframes typing {
            from {
              width: 0;
            }
            30% {
              width: 100%;
            }
            to {
              width: 100%;
            }
          }
          @keyframes caret {
            to {
              border-right-color: #fff;
            }
          }
        }
      }
      .song-info {
        flex: 1;
        overflow: hidden;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        color: $font-color;
        @media screen and (max-width: 768px) {
          // 由于 flex 元素会脱离文档流，使用 inherit 可以继承原来的宽度
          width: inherit;
        }
        .title {
          font-size: 13px;
          line-height: 20px;
          .icon-like {
            margin-left: 5px;
          }
          span, i {
            cursor: pointer;
            @include hover-font;
          }
        }
        .singer {
          font-size: 12px;
          .name {
            cursor: pointer;
            @include hover-font;
          }
        }
      }
    }
    .mid {
      flex-shrink: 0;
      width: 500px;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      @media screen and (max-width: 768px) {
        width: 30%;
      }
      .wrap {
        height: 100%;
        .play-controls {
          transform: translateY(-43px);
          height: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          i {
            font-size: 16px;
            display: inline-block;
            cursor: pointer;
            @include hover-font;
            &:hover {
              @include bounce-hover;
            }
          }
        }
        .lyric-wrap {
          width: 100%;
          height: 100%;
          font-size: 14px;
          position: absolute;
          top: 0;
          @include flex-center;
          color: $font-active-color;
        }
        .mobile-progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
    }
    .right {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .controls-wrap {
        height: 100%;
        transform: translateY(-43px);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          font-size: 16px;
          display: inline-block;
          margin-right: 20px;
          cursor: pointer;
          @include hover-font;
          &:hover {
            @include bounce-hover;
          }
        }
      }
      .duration-wrap {
        font-size: 12px;
        padding-right: 10px;
        display: flex;
        align-items: center;
        height: 100%;
        position: absolute;
        top: 0;
        color: $font-color;
      }
    }
  }
}
</style>
