<template>
  <div class="user-profile-edit-form-wrap">
    <div class="hidden-xs-only">
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
            <RegionSelector
              v-if="profileForm.province"
              v-model:province="profileForm.province"
              v-model:city="profileForm.city"
            />
          </el-form-item>
        </el-form>
        <div class="updater-wrap">
          <ImageUpdater
            :img-url="profileForm.avatarUrl"
            edit-button-label="修改头像"
            :update-img-api="updateUserAvatarApi"
            @on-updated="handleImgUpdated"
          />
        </div>
      </div>
      <div class="buttons">
        <el-button
          type="primary"
          :disabled="isFormChange"
          @click="onSave"
          v-loading.fullscreen.lock="isLoading"
          >保存</el-button
        >
        <el-button @click="router.back()">取消</el-button>
      </div>
    </div>
    <div class="mobile hidden-sm-and-up">
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
            <RegionSelector
              v-if="profileForm.province"
              v-model:province="profileForm.province"
              v-model:city="profileForm.city"
            />
          </el-form-item>
        </el-form>
        <div class="updater-wrap">
          <ImageUpdater
            :img-url="profileForm.avatarUrl"
            edit-button-label="修改头像"
            :update-img-api="updateUserAvatarApi"
            @on-updated="handleImgUpdated"
          />
        </div>
      </div>
      <div class="buttons">
        <el-button
          type="primary"
          :disabled="isFormChange"
          @click="onSave"
          v-loading.fullscreen.lock="isLoading"
          >保存</el-button
        >
        <el-button @click="router.back()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  watch,
  ref,
  onBeforeMount,
} from 'vue'
import RegionSelector from '@/components/common/RegionSelector.vue'
import { useRouter } from 'vue-router'
import { updateUserProfile, updateUserAvatar, getUserDetail } from '@/api/user'
import { ElMessage } from 'element-plus'
import { Decrypt } from '@/utils/secret'
import ImageUpdater from '@/components/common/ImageUpdater.vue'
import emitter from '@/utils/emitter'

/* 路由管理 */
const router = useRouter()

/* 渲染数据 */
const profileForm = reactive({
  nickname: '',
  gender: '',
  birthday: '',
  province: '',
  city: '',
  signature: '',
  avatarUrl: '',
})
const getData = async () => {
  const uid = Decrypt(String(window.localStorage.getItem('uid')))
  const { data } = await getUserDetail({ uid })
  profileForm.nickname = data.profile.nickname
  profileForm.gender = data.profile.gender
  profileForm.birthday = data.profile.birthday
  profileForm.province = String(data.profile.province)
  profileForm.city = String(data.profile.city)
  profileForm.signature = data.profile.signature
  profileForm.avatarUrl = data.profile.avatarUrl
}
onBeforeMount(async () => {
  await getData()
})

const isFormChange = ref(true)
const isLoading = ref(false)

/* 修改头像 */
const updateUserAvatarApi = (file: File, imgSize: number) => {
  const fd = new FormData()
  fd.append('imgFile', file)
  return updateUserAvatar(fd, {
    imgSize,
  })
}
const handleImgUpdated = () => {
  // 头像修改之后，刷新页面
  getData()
  emitter.emit('onRefreshGlobalHeader', true)
}

watch(profileForm, () => {
  isFormChange.value = false
})

const onDateChange = (val: Date) => {
  // 将 DatePicker 选择的日期转为时间戳
  profileForm.birthday = String(val.valueOf())
}
const onSave = async () => {
  isLoading.value = true
  try {
    const rst = await updateUserProfile(profileForm)
    if (rst.data.code === 200) {
      ElMessage({
        type: 'success',
        message: '修改成功',
        appendTo: document.body,
      })
    } else {
      ElMessage({
        type: 'error',
        message: rst.data.message,
        appendTo: document.body,
      })
    }
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.response.data.message,
      appendTo: document.body,
    })
  }
  isLoading.value = false
}
</script>

<style scoped lang="scss">
.user-profile-edit-form-wrap {
  .content {
    display: flex;
    justify-content: space-between;
    .updater-wrap {
      width: 200px;
      padding: 0 20px;
    }
  }
  .mobile {
    .content {
      display: flex;
      flex-direction: column-reverse;
      .updater-wrap {
        width: 40%;
        margin-bottom: 40px;
      }
      align-items: center;
    }
    .buttons {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
