<template>
  <div class="login-box-wrap">
    <img src="@/assets/logo.png">
    <el-tabs
      type="border-card"
      :stretch="true"
      v-loading="isLoading"
      element-loading-text="登录中..."
      element-loading-background="rgba(255, 255, 255, 0.5)"
    >
      <el-tab-pane label="账号登录" v-if="isLogin">
        <LoginBoxForm type="phone" />
      </el-tab-pane>
      <el-tab-pane label="短信登录" v-if="isLogin">
        <LoginBoxForm type="sms" />
      </el-tab-pane>
      <el-tab-pane label="邮箱登录" v-if="isLogin">
        <LoginBoxForm type="email" />
      </el-tab-pane>
      <el-tab-pane label="扫码登录" v-if="isLogin">
        <LoginBoxQrCode />
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
</template>

<script setup lang="ts">
import LoginBoxForm from '@/components/login/LoginBoxForm.vue'
import LoginBoxQrCode from '@/components/login/LoginBoxQrCode.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
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
.login-box-wrap {
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
</style>
