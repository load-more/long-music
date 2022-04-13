<template>
  <div class="login-container">
    <div class="canvas-wrap">
      <RainCanvas />
    </div>
    <div class="corner-wrap">
      <GithubCorner />
    </div>
    <div class="box-wrap">
      <LoginBox />
    </div>
    <audio ref="audioRef" src="/rain.mp3" loop></audio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GithubCorner from './github-corner/GithubCorner.vue'
import LoginBox from './box/LoginBox.vue'
import RainCanvas from './canvas/RainCanvas.vue'

const audioRef = ref()
window.addEventListener('click', () => {
  if (audioRef.value) {
    audioRef.value.play()
  }
})
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-image: url('/rainBg.png');
  background-size: cover;
  .canvas-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  .box-wrap {
    width: 420px;
    height: 373px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
  }
  .corner-wrap {
    position: absolute;
    z-index: 2;
    right: 0;
  }
}
</style>
