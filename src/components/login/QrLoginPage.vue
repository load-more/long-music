<template>
  <div class="wrap">
    <el-image
      class="qrcode"
      :src="imgUrl"
      fit="fit"
      v-loading="isLoading"
      element-loading-text="加载中..."
      element-loading-background="rgba(255,255,255,0.8)"
    >
      <template #error>
        <div class="error-slot">
          <i class="iconfont icon-picture"></i>
        </div>
      </template>
    </el-image>
    <div class="prompt">{{ prompt }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { generateQrKey, generateQrCode, checkQrCode } from '@/api/login'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['closeDialog'])

const imgUrl = ref('')
const isLoading = ref(false)
let timer: NodeJS.Timer | null = null
const prompt = ref('')

onUnmounted(() => {
  clearInterval(timer!)
  timer = null
})

const displayQrCode = async () => {
  let key = ''
  try {
    isLoading.value = true
    // 生成二维码 key
    const keyRst = await generateQrKey()

    if (keyRst.data.code === 200) {
      key = keyRst.data.data.unikey
      // 如果成功，则生成二维码图片
      const qrRst = await generateQrCode({
        key,
        qrimg: true,
      })
      // 如果成功，将图片替换
      if (qrRst.data.code === 200) {
        imgUrl.value = qrRst.data.data.qrimg
      }
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '加载失败',
      appendTo: document.body,
    })
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
    switch (rst) {
      case 800:
        prompt.value = '二维码已过期'
        break
      case 801:
        prompt.value = '等待扫码'
        break
      case 802:
        prompt.value = '授权中'
        break
      case 803:
        prompt.value = '授权登录成功'
        ElMessage({
          type: 'success',
          message: '登录成功！',
          appendTo: document.body,
        })
        emit('closeDialog')
        clearInterval(timer!)
        timer = null
        break
      default:
        break
    }
  }, 500)
}

displayQrCode()
</script>

<style scoped lang="scss">
.wrap {
  text-align: center;
  .qrcode {
    width: 150px;
    height: 150px;
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
  .prompt {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 15px;
  }
}
</style>
