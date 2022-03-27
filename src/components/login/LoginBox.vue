<template>
  <div class="login-box-wrap">
    <el-tabs
      v-model="currentTab"
      type="border-card"
      :stretch="true"
      v-loading="isLoading"
      element-loading-text="登录中..."
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
      <el-tab-pane label="账号登录" v-if="isLogin" name="phone">
        <LoginBoxForm type="phone" />
      </el-tab-pane>
      <el-tab-pane label="短信登录" v-if="isLogin" name="sms">
        <LoginBoxForm type="sms" />
      </el-tab-pane>
      <el-tab-pane label="邮箱登录" v-if="isLogin" name="email">
        <LoginBoxForm type="email" />
      </el-tab-pane>
      <el-tab-pane label="扫码登录" v-if="isLogin" name="qrcode">
        <LoginBoxQrCode v-if="currentTab === 'qrcode'" />
      </el-tab-pane>
      <el-tab-pane label="注册" v-else name="register">
        <RegisterForm />
      </el-tab-pane>
      <span class="register" v-if="isLogin">
        没有账号？<strong @click="handleClickRegister">去注册</strong>
      </span>
      <span class="back" v-else @click="handleClickBack">
        <i class="iconfont icon-return"></i>
        返回
      </span>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import LoginBoxForm from '@/components/login/LoginBoxForm.vue'
import LoginBoxQrCode from '@/components/login/LoginBoxQrCode.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import { ref, onUnmounted } from 'vue'
import emitter from '@/utils/emitter'

const isLoading = ref(false)
const isLogin = ref(true)
const currentTab = ref('phone')
const tabCache = ref('phone')

const handleClickRegister = () => {
  isLogin.value = false
  tabCache.value = currentTab.value
  currentTab.value = 'register'
}
const handleClickBack = () => {
  isLogin.value = true
  currentTab.value = tabCache.value
}

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
.login-box-wrap {
  height: 100%;
  --el-text-color-secondary: rgb(170, 170, 170);
  :deep .el-button--primary {
    --el-button-bg-color: rgba(255, 255, 255, 0.1) !important;
    --el-button-border-color: rgba(255, 255, 255, 0.1) !important;
    --el-button-hover-bg-color: rgba(255, 255, 255, 0.2) !important;
    --el-button-hover-border-color: rgba(255, 255, 255, 0.2) !important;
    --el-button-active-bg-color: rgba(255, 255, 255, 0.3) !important;
    --el-button-active-border-color: rgba(255, 255, 255, 0.3) !important;
    --el-button-disabled-bg-color: rgba(255, 255, 255, 0.3) !important;
    --el-button-disabled-border-color: rgba(255, 255, 255, 0.3) !important;
  }
  @media screen and (max-width: 768px) {
    width: 320px;
  }
  .register, .back {
    display: inline-block;
    color: $font-color;
    font-size: 14px;
    position: absolute;
    right: 32px;
    bottom: 32px;
  }
  .register > strong {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: #fff;
    }
  }
  .back {
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
}
:deep .el-tabs {
  width: 100%;
  border-radius: 20px;
  background-color: transparent;
  border: none;
  overflow: hidden;
  position: absolute;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-image: url(./rainBg.png);
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
    filter: blur(4px);
    margin: -20px;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(#000, 0.25);
  }
  .el-tabs__header {
    border-radius: 20px;
    background-color: transparent;
    border: none;
  }
  .el-tabs__content {
    position: relative;
    box-sizing: border-box;
    border-radius: 20px;
    height: 335px;
    padding: 32px;
    background-color: transparent;
  }
  .is-active {
    border-radius: 20px;
    background-color: transparent !important;
  }
  .el-tabs__item {
    transition: none;
    border: none;
  }
}
:deep .el-checkbox__inner {
  border-color: rgba(255, 255, 255, 0.2) !important;
}
:deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: rgb(16, 180, 16) !important;
}
:deep .el-loading-mask {
  border-radius: 20px;
}
</style>
