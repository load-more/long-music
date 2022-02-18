<template>
  <div class="box-wrap">
    <a href="https://github.com/load-more/long-music"
      target="_blank"
      class="github-corner" aria-label="View source on GitHub"
    >
      <svg
        width="80" height="80" viewBox="0 0 250 250" style="fill:#9b791c; color:#ffd1d3;
        position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,
          82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,
          76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,
          101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,
          53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,
          56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,
          80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,
          107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,
          124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor" class="octo-body"
        ></path>
      </svg>
    </a>
    <div class="login-box">
      <img src="../assets/logo.png">
      <el-tabs
        type="border-card"
        :stretch="true"
        v-loading="isLoading"
        element-loading-text="登录中..."
        element-loading-background="rgba(255, 255, 255, 0.5)"
      >
        <el-tab-pane label="账号登录" v-if="isLogin">
          <LoginForm type="phone" />
        </el-tab-pane>
        <el-tab-pane label="短信登录" v-if="isLogin">
          <LoginForm type="sms" />
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" v-if="isLogin">
          <LoginForm type="email" />
        </el-tab-pane>
        <el-tab-pane label="扫码登录" v-if="isLogin">
          <QrLoginPage />
        </el-tab-pane>
        <el-tab-pane label="注册" v-else>
          <RegisterForm />
        </el-tab-pane>
      </el-tabs>
      <span class="register" v-if="isLogin">
        没有账号？<strong @click="isLogin=false">去注册</strong>
      </span>
      <span class="back" v-else @click="isLogin=true">
        <i class="iconfont icon-return"></i>
        返回
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/login/LoginForm.vue'
import QrLoginPage from '@/components/login/QrLoginPage.vue'
import RegisterForm from '@/components/register/RegisterForm.vue'
import { ref, onUnmounted } from 'vue'
import emitter from '@/utils/emitter'

const isLoading = ref(false)
const isLogin = ref(true)
emitter.on('onToggleLoginLoading', (status) => {
  isLoading.value = status
})
emitter.on('onToggleRegisterLoading', (status) => {
  isLoading.value = status
})
onUnmounted(() => {
  emitter.off('onToggleLoginLoading')
  emitter.off('onToggleRegisterLoading')
})
</script>

<style scoped lang="scss">
.box-wrap {
  width: 100%;
  height: 100%;
  background-image: url('/loginBg.jpg');
  background-size: cover;
  position: relative;
  overflow: hidden;
  .login-box {
    width: 420px;
    position: absolute;
    right: 200px;
    bottom: 100px;
    img {
      width: 100%;
      pointer-events: none;
    }
    @media screen and (max-width: 768px) {
      width: 320px;
      right: 50%;
      bottom: 50%;
      transform: translate(50%, 50%);
    }
  }
  .register, .back {
    display: inline-block;
    color: gray;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 20px;
  }
  .register > strong {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: white;
    }
  }
  .back {
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
}
:deep .el-tabs {
  border-radius: 20px;
  .el-tabs__header {
    border-radius: 20px;
  }
  .el-tabs__content {
    border-radius: 20px;
    height: 220px;
    padding: 32px;
    background-color: #f4f5f7;
  }
  .is-active {
    border-radius: 20px;
  }
}
:deep .el-loading-mask {
  border-radius: 20px;
}
// github corner
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%, 100% {
    transform:rotate(0);
  }
  20%, 60% {
    transform: rotate(-25deg);
  }
  40%, 80% {
    transform: rotate(10deg);
  }
}
@media (max-width:500px) {
  .github-corner:hover .octo-arm {
    animation:none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
