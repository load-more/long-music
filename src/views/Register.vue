<template>
  <div
    class="wrap"
    v-loading="isLoading"
    element-loading-text="操作中..."
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <Register />
  </div>
</template>

<script setup lang="ts">
import Register from '@/components/register/RegisterForm.vue'
import { ref, onUnmounted } from 'vue'
import emitter from '../utils/emitter'

const isLoading = ref(false)
emitter.on('onToggleRegisterLoading', (status) => {
  isLoading.value = status
})
onUnmounted(() => {
  emitter.off('onToggleRegisterLoading')
})
</script>

<style scoped lang="scss">
.wrap {
  padding: 10px;
}
</style>
