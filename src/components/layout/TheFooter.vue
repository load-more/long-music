<template>
  <div class="footer-wrap">
    <div class="left">
      <div class="song-image-wrap">
        <el-avatar
          :shape="currentSong.album['picUrl'] ? 'square' : 'circle'"
          :size="60"
          :class="currentSong.album['picUrl'] ? 'song-image' : 'image-holder'"
          :src="currentSong.album['picUrl'] || '/album.png'"
        ></el-avatar>
      </div>
      <div
        class="song-info"
        :title="`${currentSong.name} ${currentSong.alias ? '(' + currentSong.alias + ')' : ''}`"
      >
        <div class="title" v-if="currentSong.name">
          <span>{{ currentSong.name }}</span>
          <span v-if="currentSong.alias">&nbsp;({{ currentSong.alias }})</span>
          <i class="iconfont icon-like"></i>
        </div>
        <div class="title-holder" v-else>
          <span>匆匆岁月</span>
          <span>余音悠长</span>
        </div>
        <div class="singer" :title="currentSong.author.map(item => item.name).join(' / ')">
          <span v-for="(item, index) in currentSong.author" :key="item.id">
            <span class="name">
              {{ item.name }}
            </span>
            <span
              class="seperator"
              v-if="index !== currentSong.author.length - 1"
            >&nbsp;/&nbsp;</span>
          </span>
        </div>
      </div>
    </div>
    <div class="mid">
      <div class="play-controls">
        <i class="iconfont icon-order-play hidden-xs-only"></i>
        <i class="iconfont icon-previous"></i>
        <i
          class="iconfont icon-pause"
          v-if="isPlay"
          @click="toggleMusicPlayStatus"
        ></i>
        <i
          class="iconfont icon-play"
          v-else
          @click="toggleMusicPlayStatus"
        ></i>
        <i class="iconfont icon-next"></i>
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
      <i class="iconfont icon-volume"></i>
      <i class="iconfont icon-list"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MusicProgressBar from '@/components/common/MusicProgressBar.vue'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'

/* 音乐播放 */
const { currentSong } = storeToRefs(useMainStore())
const music = new Audio()
watch(() => currentSong.value.id, () => {
  music.src = `https://music.163.com/song/media/outer/url?id=${currentSong.value.id}.mp3`
})
const isPlay = ref(false)
const duration = ref(0)
const currentTime = ref(0)

// 暂停或播放音乐
const playMusic = () => {
  music.play()
  isPlay.value = true
  useMainStore().$patch((state) => {
    // eslint-disable-next-line no-param-reassign
    state.currentSong.isPlay = true
  })
}
const pauseMusic = () => {
  music.pause()
  isPlay.value = false
  useMainStore().$patch((state) => {
    // eslint-disable-next-line no-param-reassign
    state.currentSong.isPlay = false
  })
}
// 当音乐文件加载完成，初始化数据
music.addEventListener('canplaythrough', () => {
  duration.value = music.duration
  currentTime.value = music.currentTime
  playMusic()
})
// 每当音乐文件的时间更新，则更新 currentTime
music.addEventListener('timeupdate', () => {
  if (music.ended) {
    isPlay.value = false
  }
  currentTime.value = music.currentTime
})
// 切换音乐状态
const toggleMusicPlayStatus = () => {
  if (music) {
    if (music.paused) {
      playMusic()
    } else {
      pauseMusic()
    }
  }
}
// 当用户调整进度条后，更新音乐的 currentTime
const handleUpdateCurrentTime = (ct: number) => {
  music.currentTime = ct
}
</script>

<style scoped lang="scss">
.footer-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: #000;
  position: relative;
  .left {
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
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      color: #ddd;
      width: 200px;
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
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          background: -webkit-gradient(linear, left top, right top,
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
            -webkit-transform:translateX(-66.666%);
          }
          100% {
            -webkit-transform:translateX(0);
          }
        }
      }
      .singer {
        font-size: 14px;
      }
      .title, .singer {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .mid {
    width: 50%;
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
</style>
