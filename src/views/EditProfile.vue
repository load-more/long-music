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
        <el-button>修改头像</el-button>
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
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'
import RegionSelect from '@/components/form/RegionSelect.vue'
import { useRouter } from 'vue-router'
import { updateUserProfile } from '../api/user'
import { ElMessage } from 'element-plus'

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
</style>
