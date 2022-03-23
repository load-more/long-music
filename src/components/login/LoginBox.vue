<template>
  <div class="login-box-wrap">
    <img src="@/assets/logo.png">
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
    </el-tabs>
    <span class="register" v-if="isLogin">
      没有账号？<strong @click="handleClickRegister">去注册</strong>
    </span>
    <span class="back" v-else @click="handleClickBack">
      <i class="iconfont icon-return"></i>
      返回
    </span>
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
  width: 420px;
  position: absolute;
  right: 200px;
  bottom: 100px;
  z-index: 999;
  :deep .el-button--primary {
    --el-button-bg-color: #e9b50d !important;
    --el-button-border-color: #e9b50d !important;
    --el-button-hover-bg-color: #fabe00 !important;
    --el-button-hover-border-color: #fabe00 !important;
    --el-button-active-bg-color: #f1bc0d !important;
    --el-button-active-border-color: #f1bc0d !important;
    --el-button-disabled-bg-color: #ffe385 !important;
    --el-button-disabled-border-color: #ffe385 !important;
  }
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
  border-radius: 20px;
  background-color: #fff;
  .el-tabs__header {
    border-radius: 20px;
    background-color: transparent;
    border: none;
  }
  .el-tabs__content {
    border-radius: 20px;
    height: 220px;
    padding: 32px;
    background-color: transparent;
  }
  .is-active {
    border-radius: 20px;
    background-color: transparent !important;
    color: #000 !important;
  }
  .el-tabs__item {
    transition: none;
    border: none;
    &:hover {
      color: gray !important;
    }
  }
}
:deep .el-checkbox__inner {
  border-color: #fabe00 !important;
}
:deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #fabe00 !important;
}
:deep .el-loading-mask {
  border-radius: 20px;
}
</style>
