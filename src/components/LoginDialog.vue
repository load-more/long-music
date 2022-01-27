<template class="dialog-wrap">
  <el-dialog v-model="dialogVisible" title="登录 / 注册" class="dialog">
    <el-form
      class="form"
      :model="phoneLoginForm"
      :rules="phoneLoginRules"
      ref="formRef"
      v-loading="isLoading"
      element-loading-text="操作中..."
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <el-form-item class="form-item-phone" prop="phone">
        <el-input
          v-model="phoneLoginForm.phone"
          placeholder="请输入手机号"
        >
          <template #prefix>
            <i class="iconfont icon-phone"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-password" prop="password">
        <el-input
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="phoneLoginForm.password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <i class="iconfont icon-password"></i>
          </template>
          <template #suffix>
            <div @click="isPasswordVisible = !isPasswordVisible" class="password-eye">
              <i v-if="isPasswordVisible" class="iconfont icon-nosee"></i>
              <i v-else class="iconfont icon-see"></i>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-auto-login">
        <el-checkbox v-model="isAutoLogin" label="自动登录" size="small"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="isTest" label="测试数据" size="small"></el-checkbox>
      </el-form-item>
      <el-form-item class="form-item-login">
        <el-button type="primary" style="width: 100%;" @click="onClickLogin">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;">注册</el-button>
      </el-form-item>
      <el-form-item>
        <span class="other-methods">其他登陆方式：</span>
        <el-button circle>
          <i class="iconfont icon-email"></i>
        </el-button>
        <el-button circle>
          <i class="iconfont icon-qr-code"></i>
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
// 导入 ElForm 组件的类型，后续定义 ref 可以获取组件的属性和方法
import type { ElForm } from 'element-plus'
import { phoneLogin } from '../api/login'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(true)
const phoneLoginForm = reactive({
  phone: '',
  password: ''
})
const phoneLoginEncryptedForm = computed(() => {
  return {
    phone: phoneLoginForm.phone,
    md5_password: md5(phoneLoginForm.password) // 密码加密
  }
})
const isAutoLogin = ref(false)
const phoneLoginRules = reactive({
  phone: [
    {
      required: true,
      message: '手机号不能为空！',
      trigger: 'blur'
    },
    {
      pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      message: '手机号不存在！',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空！',
      trigger: 'blur'
    }
  ]
})
const isLoading = ref(false)
const isPasswordVisible = ref(false)
const isTest = ref(false)

watch(dialogVisible, () => {
  emit('closeDialog', dialogVisible.value)
})

watch(isTest, () => {
  phoneLoginForm.phone = '18470415369'
  phoneLoginForm.password = 'test#123'
})

/*
  定义一个继承 HTMLElement 的接口，并加上 validate 方法
  【因为从 ElementPlus 中找到定义 form 的类型，为了避免报错，所以自定义接口使其含有 validate 方法】
*/
// interface FormRef extends HTMLElement {
//   validate(callback: (result: boolean, notPass: object) => void): void
// }
// const formRef = ref<null | FormRef>(null)

const formRef = ref<InstanceType<typeof ElForm>>()
const onClickLogin = () => {
  if (formRef.value) {
    formRef.value.validate(async (result, notPass) => {
      if (result) {
        // 表单校验成功，发送请求
        isLoading.value = true
        try {
          const result = await phoneLogin(phoneLoginEncryptedForm.value)
          console.log(result)
          if (result.data.code === 200) { // 登录成功
            ElMessage({
              type: 'success',
              message: '登录成功！',
              appendTo: document.body
            })
            dialogVisible.value = false // 关闭对话框
          } else if (result.data.code === 502) { // 登录失败
            ElMessage({
              type: 'error',
              message: result.data.message,
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
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  // .form-item-phone, .form-item-login {
  //   margin-bottom: 5px;
  // }
  // .form-item-password, .form-item-auto-login {
  //   margin-bottom: 10px;
  // }
  .password-eye {
    pointer-events: auto;
    cursor: pointer;
  }
  .other-methods {
    font-size: 12px;
    color: gray;
  }
}
</style>
