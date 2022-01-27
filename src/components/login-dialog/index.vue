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
      <LoginForm
        v-else-if="currentLoginMethod === 'sms'"
        type="sms"
        @on-toggle-loading="toggleLoading"
        @close-dialog="dialogVisible=false"
      />
      <QrLoginPage
        v-else
        @close-dialog="dialogVisible=false"
      />
      <div class="bottom">
        <el-row class="other-methods">
          <span>其他登录方式：</span>
          <span>
            <el-button
              v-for="item in otherMethods"
              :key="item"
              @click="currentLoginMethod = item"
              circle
            >
              <i :class="`iconfont icon-${item}`"></i>
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
import { reactive, ref, watch, computed } from 'vue'
import LoginForm from './LoginForm.vue'
import QrLoginPage from './QrLoginPage.vue'

const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(true)
const isLoading = ref(false)
const toggleLoading = (status: boolean) => {
  isLoading.value = status
}
type loginType = 'phone' | 'sms' | 'email' | 'qrcode'
const currentLoginMethod = ref<loginType>('phone')
const dialogTitle = ref('手机登录')
const loginMethods: loginType[] = reactive(['phone', 'sms', 'email', 'qrcode'])
const otherMethods = computed(() => {
  return loginMethods.filter(item => item !== currentLoginMethod.value)
})

watch(dialogVisible, () => {
  emit('closeDialog', dialogVisible.value)
})
watch(currentLoginMethod, () => {
  if (currentLoginMethod.value === 'phone') {
    dialogTitle.value = '手机号登录'
  } else if (currentLoginMethod.value === 'email') {
    dialogTitle.value = '邮箱登录'
  } else if (currentLoginMethod.value === 'qrcode') {
    dialogTitle.value = '二维码登录'
  } else if (currentLoginMethod.value === 'sms') {
    dialogTitle.value = '短信登陆'
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
