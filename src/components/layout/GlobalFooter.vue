<template>
  <el-row class="container" align="middle" justify="space-between">
    <el-col :span="8" class="left">
      <div class="song-image">
        <el-avatar
          shape="square"
          :size="60"
          :src="currentSong.album['picUrl']"
        ></el-avatar>
      </div>
      <div
        class="song-info"
        :title="`${currentSong.name} ${currentSong.alias ? '(' + currentSong.alias + ')' : ''}`"
      >
        <div class="title">
          <span>{{ currentSong.name }}</span>
          <span v-if="currentSong.alias">&nbsp;({{ currentSong.alias }})</span>
          <i class="iconfont icon-like"></i>
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
    </el-col>
    <el-col :span="8" class="mid">
      <div class="play-controls">
        <i class="iconfont icon-order-play"></i>
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
        <i class="iconfont icon-lyrics"></i>
      </div>
      <div class="progress-bar">
        <ProgressBar
          :duration="duration"
          :current-time="currentTime"
          @update-current-time="handleUpdateCurrentTime"
        />
      </div>
    </el-col>
    <el-col :span="8" class="right">
      <a href="/#"><i class="iconfont icon-volume"></i></a>
      <a href="/#"><i class="iconfont icon-list"></i></a>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ProgressBar from '@/components/music/ProgressBar.vue'
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
.container {
  height: 80px;
  background-color: #000;
  color: #fff;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    .song-image {
      height: 60px;
      margin: 0 10px;
    }
    .song-info {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .title {
        font-size: 20px;
        .icon-like {
          margin-left: 5px;
        }
      }
      .author {
        font-size: 14px;
      }
    }
  }
  .mid {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .play-controls {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      i {
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }
    }
    .progress-bar {
      display: flex;
      justify-content: center;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    i {
      font-size: 16px;
      color: #fff;
    }
    a {
      margin-right: 20px;
    }
  }
}
</style>
