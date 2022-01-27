<template class="dialog-wrap">
  <el-dialog v-model="dialogVisible" :title="dialogTitle" class="dialog">
    <div
      class="wrap"
      v-loading="isLoading"
      element-loading-text="操作中..."
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <LoginForm
        v-if="currentLoginMethod === 'phone'"
        type="phone"
        @on-toggle-loading="toggleLoading"
        @close-dialog="dialogVisible=false"
      />
      <LoginForm
        v-else-if="currentLoginMethod === 'email'"
        type="email"
        @on-toggle-loading="toggleLoading"
        @close-dialog="dialogVisible=false"
      />
      <div class="bottom">
        <el-row class="other-methods">
          <span>其他登录方式：</span>
          <span v-if="currentLoginMethod === 'phone'">
            <el-button circle @click="currentLoginMethod = 'email'">
              <i class="iconfont icon-email"></i>
            </el-button>
            <el-button circle>
              <i class="iconfont icon-qr-code"></i>
            </el-button>
          </span>
          <span v-else-if="currentLoginMethod === 'email'">
            <el-button circle @click="currentLoginMethod = 'phone'">
              <i class="iconfont icon-phone"></i>
            </el-button>
            <el-button circle>
              <i class="iconfont icon-qr-code"></i>
            </el-button>
          </span>
          <span v-else>
            <el-button circle @click="currentLoginMethod = 'email'">
              <i class="iconfont icon-phone"></i>
            </el-button>
            <el-button circle>
              <i class="iconfont icon-email"></i>
            </el-button>
          </span>
        </el-row>
        <el-row class="register">
          <a href="/#">注册</a>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import LoginForm from './index.vue'

const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(true)
const isLoading = ref(false)
const toggleLoading = (status: boolean) => {
  isLoading.value = status
}
const currentLoginMethod = ref<'phone' | 'email'>('phone')
const dialogTitle = ref('手机登录')

watch(dialogVisible, () => {
  emit('closeDialog', dialogVisible.value)
})
watch(currentLoginMethod, () => {
  if (currentLoginMethod.value === 'phone') {
    dialogTitle.value = '手机登录'
  } else if (currentLoginMethod.value === 'email') {
    dialogTitle.value = '邮箱登录'
  }
})
</script>

<style scoped lang="scss">
.wrap {
  .bottom {
    .other-methods {
      font-size: 12px;
      color: gray;
      display: flex;
      align-items: center;
    }
    .register {
      font-size: 14px;
      text-decoration: underline;
      a {
        color: gray;
      }
    }
  }
}
</style>
