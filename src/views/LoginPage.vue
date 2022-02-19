<template>
  <div class="login-container">
    <GithubCorner />
    <LoginBox />
  </div>
</template>

<script setup lang="ts">
import GithubCorner from '@/components/common/GithubCorner.vue'
import LoginBox from '@/components/login/LoginBox.vue'
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background-image: url('/loginBg.jpg');
  background-size: cover;
  position: relative;
  overflow: hidden;
}
</style>
