<template>
  <div
    class="login-box-qr-code-wrap"
    v-loading="isLoading"
    element-loading-text="加载中..."
    element-loading-background="transparent"
  >
    <el-image
      class="qrcode"
      :src="imgUrl"
      v-if="!isLoading"
    >
      <template #error>
        <div class="error-slot">
          <i class="iconfont icon-picture"></i>
        </div>
      </template>
    </el-image>
    <div class="prompt" v-if="!isLoading">{{ prompt }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { generateQrKey, generateQrCode, checkQrCode } from '@/api/login'
import { getUserAccount } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { Encrypt } from '@/utils/secret'

const imgUrl = ref('')
const isLoading = ref(false)
let timer: NodeJS.Timer | null = null
const prompt = ref('')
const router = useRouter()

onUnmounted(() => {
  clearInterval(timer!)
  timer = null
})

const displayQrCode = async () => {
  let key = ''
  isLoading.value = true
  // 生成二维码 key
  const { data: keyData } = await generateQrKey()

  if (keyData.code === 200) {
    key = keyData.data.unikey
    // 如果成功，则生成二维码图片
    const { data: qrData } = await generateQrCode({
      key,
      qrimg: true,
    })
    // 如果成功，将图片替换
    if (qrData.code === 200) {
      imgUrl.value = qrData.data.qrimg
    }
  }
  isLoading.value = false

  const getQrCodeStatus = async (keyStr: string) => {
    const rst = await checkQrCode({
      key: keyStr,
    })
    return rst.data.code
  }

  timer = setInterval(async () => {
    const rst = await getQrCodeStatus(key)
    if (rst === 800) {
      prompt.value = '二维码已过期'
    } else if (rst === 801) {
      prompt.value = '等待扫码'
    } else if (rst === 802) {
      prompt.value = '授权中'
    } else if (rst === 803) {
      const { data } = await getUserAccount()
      if (data.code === 200) {
        // 登录成功后，存储用户 id 和 cookie
        const uid = Encrypt(data.account.id)
        window.localStorage.setItem('uid', uid)
        // 跳转路由
        router.push({ name: 'home' })
        ElMessage({
          type: 'success',
          message: '登录成功！',
          appendTo: document.body,
        })
      } else {
        ElMessage({
          type: 'error',
          message: data.message,
          appendTo: document.body,
        })
      }
      prompt.value = '授权登录成功'
      ElMessage({
        type: 'success',
        message: '登录成功！',
        appendTo: document.body,
      })
      clearInterval(timer!)
      timer = null
    }
  }, 500)
}

displayQrCode()
</script>

<style scoped lang="scss">
.login-box-qr-code-wrap {
  width: 100%;
  height: 100%;
  text-align: center;
  color: $font-color;
  position: relative;
  .qrcode {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 32px;
    .error-slot {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 15px;
      }
    }
  }
  :deep .el-loading-mask {
    border-radius: 0 !important;
    .el-loading-spinner {
      transform: translateY(-32px);
    }
  }
  .prompt {
    font-size: 20px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>
