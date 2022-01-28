<template>
  <div
    class="wrap"
    v-loading="isLoading"
    element-loading-text="操作中..."
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <h1>{{ pathDict[route.path] }}</h1>
    <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/login/Footer.vue'
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import emitter from '../utils/emitter';

const isLoading = ref(false)
const route = useRoute()
const pathDict = {
  '/login': '手机登录',
  '/login/sms': '短信登录',
  '/login/email': '邮箱登录',
  '/login/qrcode': '二维码登录'
}
emitter.on('onToggleLoginLoading', (status) => {
  isLoading.value = status
})
onUnmounted(() => {
  emitter.off('onToggleLoginLoading')
})
</script>

<style scoped lang="scss">
.wrap {
  padding: 10px;
}
</style>
