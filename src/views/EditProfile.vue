<template>
  <div class="wrap">
    <h2>编辑资料</h2>
    <div class="content">
      <el-form ref="formRef" :model="profileForm" class="form">
        <el-form-item label="昵称：">
          <el-input v-model="profileForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="介绍：">
          <el-input
            v-model="profileForm.signature"
            type="textarea"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="profileForm.gender">
            <el-radio :label="0">保密</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：">
          <el-date-picker
            class="date-picker"
            v-model="profileForm.birthday"
            type="date"
            placeholder="选择日期"
            @change="onDateChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地区：">
          <RegionSelect
            v-model:province="profileForm.province"
            v-model:city="profileForm.city"
          />
        </el-form-item>
      </el-form>
      <div class="avatar-wrap">
        <el-image
          class="avatar"
          :src="detail['avatarUrl']"
          fit="fit"
        ></el-image>
        <el-button
          @click="inputRef?.click()"
        >修改头像</el-button>
        <input
          type="file"
          ref="inputRef"
          @change="handleFileChange"
          hidden
        >
      </div>
    </div>
    <el-button
      type="primary"
      :disabled="isFormChange"
      @click="onSave"
      v-loading.fullscreen.lock="isLoading"
    >保存</el-button>
    <el-button @click="router.back()">取消</el-button>
  </div>
  <el-dialog
    class="dialog"
    title="上传头像"
    v-model="isShowDialog"
    :append-to-body="true"
    @open="handleDialogOpen"
    @closed="handleDialogClose"
  >
    <div class="img-wrap">
      <div class="img-src">
        <img
          ref="imgRef"
          :src="previewUrl"
        >
      </div>
      <div class="img-preview" ref="previewRef"></div>
    </div>
    <el-button @click="handleReselect">重选</el-button>
    <el-button
      v-loading.fullscreen.lock="isLoading"
      @click="handleUpload"
    >上传</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'
import RegionSelect from '@/components/form/RegionSelect.vue'
import { useRouter } from 'vue-router'
import { updateUserProfile, updateUserAvatar } from '../api/user'
import { ElMessage } from 'element-plus'
import 'cropperjs/dist/cropper.css' // 加载样式【必须引入】
import Cropper from 'cropperjs'

const { detail } = storeToRefs(useMainStore())
const profileForm = reactive({
  nickname: detail.value['nickname'],
  gender: detail.value['gender'],
  birthday: detail.value['birthday'],
  province: String(detail.value['province']),
  city: String(detail.value['city']),
  signature: detail.value['signature']
})
const isFormChange = ref(true)
const router = useRouter()
const isLoading = ref(false)

// image cropper
const inputRef = ref<HTMLInputElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)
const previewUrl = ref('')
const isShowDialog = ref(false)
let cropper: Cropper | null = null

const handleFileChange = async () => {
  const files = inputRef.value?.files

  if (files?.length) {
    const file = files[0]
    const fileStorage = file.size

    // 检查图片尺寸是否合格
    const checkImgSize = async (url: string) => {
      const p = new Promise((resolve, reject) => {
        const image = new Image() // 实例化 Image
        image.src = url
        image.onload = () => {
          resolve(image)
        }
        image.onerror = () => {
          reject(false)
        }
      })
      const image: any = await p
      if (image.width >= 320 && image.height >= 320) {
        return true
      }
      return false
    }
    // 检查图片大小是否合格
    const checkImgStorage = () => {
      // 图片小于 5M 即合格
      if (fileStorage <= 5 * 1024 * 1024) {
        return true
      }
      return false
    }

    inputRef.value!.value = '' // 将 input 内容置空，防止选择同一文件不触发 fileChange 事件

    const _URL = window.URL || window.webkitURL // 兼容处理
    previewUrl.value = _URL.createObjectURL(file) // 创建文件对象 URL

    if (!await checkImgSize(previewUrl.value)) {
      ElMessage({
        type: 'error',
        message: '请选择分辨率超过320*320的图片',
        appendTo: document.body
      })
    } else if (!checkImgStorage()) {
      ElMessage({
        type: 'error',
        message: '请选择大小不超过5M的图片',
        appendTo: document.body
      })
    } else {
      isShowDialog.value = true
    }
  }
}
const handleDialogOpen = async () => {
  // 注意，这里必须等到 img 加载完成后创建 cropper！
  setTimeout(() => {
    cropper = new Cropper(imgRef.value as HTMLImageElement, {
      viewMode: 1, // 视图模式，设置为选择框不能超过图片区域
      dragMode: 'none', // 不能拖拽背景
      aspectRatio: 1, // 选择框纵横比，固定为 1:1
      guides: false, // 取消指引线
      cropBoxResizable: true, // 选择框大小不可变
      scalable: false, // 禁用缩放
      zoomable: false, // 禁用缩放
      minCropBoxWidth: 50,
      minCropBoxHeight: 50,
      preview: previewRef.value as HTMLElement,
      background: false // 去除背景
    })
  }, 0)
}
const handleDialogClose = () => {
  cropper?.destroy()
  cropper = null
  previewUrl.value = ''
}
const handleReselect = () => {
  isShowDialog.value = false
  inputRef.value?.click()
}
const handleUpload = () => {
  cropper?.getCroppedCanvas().toBlob(async (file: any) => {
    isLoading.value = true
    const cropperData = cropper?.getData(true)
    const fd = new FormData()
    fd.append('imgFile', file)
    try {
      const rst = await updateUserAvatar(fd, {
        imgSize: cropperData?.width,
        imgX: cropperData?.x,
        imgY: cropperData?.y
      })
      if (rst.data.code === 200) {
        isShowDialog.value = false
        ElMessage({
          type: 'success',
          message: '头像修改成功',
          appendTo: document.body
        })     
      } else {
        ElMessage({
          type: 'error',
          message: rst.data.message,
          appendTo: document.body
        }) 
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: '未知错误',
        appendTo: document.body
      })
    }
    isLoading.value = false
  })
}

watch(profileForm, () => {
  isFormChange.value = false
})

const onDateChange = (val: Date) => {
  // 将 DatePicker 选择的日期转为时间戳
  profileForm.birthday = val.valueOf()
}
const onSave = async () => {
  isLoading.value = true
  try {
    const rst = await updateUserProfile(profileForm)
    if (rst.data.code === 200) {
      ElMessage({
        type: 'success',
        message: '修改成功',
        appendTo: document.body
      })
    } else {
      ElMessage({
        type: 'error',
        message: rst.data.message,
        appendTo: document.body
      })
    }
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.response.data.message,
      appendTo: document.body
    })
  }
  isLoading.value = false
}
</script>

<style scoped lang="scss">
.wrap {
  padding: 20px;
  .content {
    display: flex;
    .form {
      width: 500px;
      margin-right: 200px;
    }
    .avatar-wrap {
      display: flex;
      flex-direction: column;
      .avatar {
        width: 200px;
        height: 200px;
      }
    }
  }
}
.el-dialog {
  .img-wrap {
    display: flex;
    .img-src {
      width: 220px;
      height: 220px;
      border-radius: 5px;
      img {
        width: 0;
        height: 0;
        display: block;
        max-width: 100%;
      }
    }
    .img-preview {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
}
</style>
