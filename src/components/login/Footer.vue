<template>
  <div class="bottom">
    <el-row class="other-methods">
      <span>其他登录方式：</span>
      <span>
        <el-button
          v-for="item in otherMethods"
          :key="item"
          @click="router.push({name: item})"
          circle
        >
          <i :class="`iconfont icon-${item}`"></i>
        </el-button>
      </span>
    </el-row>
    <el-row class="register">
      <span @click="router.push({name: 'register'})">注册</span>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const pathDict = {
  '/login': 'phone',
  '/login/sms': 'sms',
  '/login/email': 'email',
  '/login/qrcode': 'qrcode'
}
const route = useRoute()
const router = useRouter()
type loginType = 'phone' | 'sms' | 'email' | 'qrcode'
const currentLoginMethod = ref<loginType>(pathDict[route.path])
const loginMethods: loginType[] = reactive(['phone', 'sms', 'email', 'qrcode'])
const otherMethods = computed(() => {
  return loginMethods.filter(item => item !== currentLoginMethod.value)
})
watch(route, () => {
  currentLoginMethod.value = pathDict[route.path]
})
</script>

<style scoped lang="scss">
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
    span {
      color: gray;
      cursor: pointer;
    }
  }
}
</style>
