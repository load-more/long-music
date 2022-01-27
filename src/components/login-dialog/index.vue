<template class="dialog-wrap">
  <el-form
    class="form"
    :model="loginForm"
    :rules="loginRules"
    ref="formRef"
  >
    <el-form-item :prop="props.type">
      <el-input
        v-model="loginForm[props.type]"
        :placeholder="props.type === 'phone' ? '请输入手机号' : '请输入邮箱地址'"
      >
        <template #prefix>
          <i :class="['iconfont', props.type === 'phone' ? 'icon-phone' : 'icon-email']"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :type="isPasswordVisible ? 'text' : 'password'"
        v-model="loginForm.password"
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
    <el-form-item>
      <el-checkbox v-model="isAutoLogin" label="自动登录" size="small"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="isTest" label="测试数据" size="small"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%;" @click="onClickLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
// 导入 ElForm 组件的类型，后续定义 ref 可以获取组件的属性和方法
import type { ElForm } from 'element-plus'
import { phoneLogin, emailLogin } from '../../api/login'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

const emit = defineEmits(['closeDialog', 'onToggleLoading'])
const props = defineProps<{
  type: 'phone' | 'email'
}>()

const loginForm = reactive({
  password: ''
})
loginForm[props.type] = ''

const encryptedLoginForm = computed(() => {
  const obj = {}
  obj[props.type] = loginForm[props.type]
  obj['md5_password'] = md5(loginForm.password) // 密码加密
  return obj
})
const isAutoLogin = ref(false)

const phoneRule = [
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
]
const emailRule = [
  {
    required: true,
    message: '邮箱地址不能为空！',
    trigger: 'blur'
  },
  {
    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '邮箱地址不存在！',
    trigger: 'blur'
  }
]

const loginRules = reactive({
  password: [
    {
      required: true,
      message: '密码不能为空！',
      trigger: 'blur'
    }
  ]
})
loginRules[props.type] = props.type === 'phone' ? phoneRule : emailRule

const isLoading = ref(false)
const isPasswordVisible = ref(false)
const isTest = ref(false)

watch(isTest, () => {
  if (props.type === 'phone') {
    loginForm[props.type] = '18470415369'
    loginForm.password = 'test#123'
  } else {
    loginForm[props.type] = 'shylobing@163.com'
    loginForm.password = 'test.123'
  }
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
        emit('onToggleLoading', true) // 开启 loading
        try {
          let result = null
          if (props.type === 'phone') {
            result = await phoneLogin(encryptedLoginForm.value as any)
          } else {
            result = await emailLogin(encryptedLoginForm.value as any)
          }
          console.log(result)
          if (result.data.code === 200) { // 登录成功
            ElMessage({
              type: 'success',
              message: '登录成功！',
              appendTo: document.body
            })
            emit('closeDialog') // 关闭对话框
          } else if (result.data.code === 502) { // 登录失败
            ElMessage({
              type: 'error',
              message: result.data.message,
              appendTo: document.body
            })
          }
        } catch (error: any) {
          const errorMsg = error.response.data.message ? error.response.data.message : '账号不存在'
          ElMessage({
            type: 'error',
            message: errorMsg,
            appendTo: document.body
          })
        }
        emit('onToggleLoading', false) // 关闭 loading
      }
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  .password-eye {
    pointer-events: auto;
    cursor: pointer;
  }
}
</style>
