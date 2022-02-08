<template class="dialog-wrap">
  <el-form
    class="form"
    :model="loginForm"
    :rules="loginRules"
    ref="formRef"
  >
    <template v-if="props.type==='phone'">
      <el-form-item prop="phone">
        <el-input
          v-model="loginForm.phone"
          placeholder="请输入手机号"
        >
          <template #prefix>
            <i class="iconfont icon-phone"></i>
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
    </template>
    <template v-else-if="props.type==='email'">
      <el-form-item prop="email">
        <el-input
          v-model="loginForm.email"
          placeholder="请输入邮箱地址"
        >
          <template #prefix>
            <i class="iconfont icon-email"></i>
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
    </template>
    <template v-else-if="props.type==='sms'">
      <el-form-item prop="phone">
        <el-input
          v-model="loginForm.phone"
          placeholder="请输入手机号"
        >
          <template #prefix>
            <i class="iconfont icon-phone"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          v-model="loginForm.captcha"
          placeholder="请输入验证码"
        >
          <template #prefix>
            <div class="captcha-wrap">
              <i class="iconfont icon-captcha"></i>
            </div>
          </template>
          <template #append>
            <el-button
              @click="onClickCaptcha"
              :disabled="counter !== countdownTime"
              v-loading="isCaptchaLoading"
            >{{ counter === countdownTime ? '获取验证码' : `重新获取${counter}s`}}</el-button>
          </template>
        </el-input>
      </el-form-item>
    </template>
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
import { phoneLogin, emailLogin, sendCaptcha, verifyCaptcha } from '@/api/login'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'
import emitter from '@/utils/emitter'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/index'
import { Encrypt } from '@/utils/secret'

const props = defineProps<{
  type: 'phone' | 'email' | 'sms'
}>()

const isAutoLogin = ref(false)
const isPasswordVisible = ref(false)
const isTest = ref(false)
const countdownTime = 60
const counter = ref(countdownTime)
let timer: NodeJS.Timer | null = null
const isCaptchaLoading = ref(false)
const router = useRouter()
const mainStore = useMainStore()

const loginForm = reactive({
  phone: '',
  password: '',
  email: '',
  captcha: ''
})
const loginRules = reactive({
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
  ],
  email: [
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
  ],
  captcha: [
    {
      required: true,
      message: '验证码不能为空！',
      trigger: 'blur'
    }
  ]
})

const encryptedLoginForm = computed(() => {
  if (props.type === 'phone') {
    return {
      phone: loginForm.phone,
      md5_password: md5(loginForm.password) // 密码加密
    }
  } else if (props.type === 'email') {
    return {
      email: loginForm.email,
      md5_password: md5(loginForm.password)
    }
  } else if (props.type === 'sms') {
    return {
      phone: loginForm.phone,
      captcha: loginForm.captcha
    }
  }
})

watch(isTest, () => {
  if (isTest.value) {
    if (props.type === 'phone') {
      loginForm.phone = '18470415369'
      loginForm.password = 'test.123'
    } else if (props.type === 'email') {
      loginForm.email = 'shylobing@163.com'
      loginForm.password = 'test.123'
    } else if (props.type === 'sms') {
      loginForm.phone = '18470415369'
      loginForm.captcha = '123456'
    }
  } else {
    loginForm.phone = ''
    loginForm.password = ''
    loginForm.email = ''
    loginForm.captcha = ''
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
        emitter.emit('onToggleLoginLoading', true) // 开启 loading
        try {
          let result: any = null
          if (props.type === 'phone') {
            result = await phoneLogin(encryptedLoginForm.value as any)
          } else if (props.type === 'email') {
            result = await emailLogin(encryptedLoginForm.value as any)
          } else {
            result = await verifyCaptcha({
              phone: loginForm.phone,
              captcha: loginForm.captcha
            })
          }
          if (result.data.code === 200) { // 登录成功
            router.push({ name: 'home' }) // 跳转路由
            // 登录成功后，存储用户 id 和 cookie
            const uid = Encrypt(result.data.account.id)
            window.localStorage.setItem('uid', uid)
            // 切换登录状态
            mainStore.$patch((state) => {
              state.isLogin = true
            })
            ElMessage({
              type: 'success',
              message: '登录成功！',
              appendTo: document.body
            })
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
        emitter.emit('onToggleLoginLoading', false) // 关闭 loading
      }
    })
  }
}
const onClickCaptcha = () => {
  // 校验手机号
  formRef.value?.validateField('phone', async (notPass) => {
    if (!notPass) {
      isCaptchaLoading.value = true
      try {
        const rst = await sendCaptcha({
          phone: loginForm.phone
        })
        isCaptchaLoading.value = false
        if (rst.data.code === 200) {
          counter.value--
          timer = setInterval(() => {
            counter.value--
            if (counter.value === 0) {
              clearInterval(timer!)
              timer = null
              counter.value = countdownTime
            }
          }, 1000)
        }
      } catch (error) {
        isCaptchaLoading.value = false
        ElMessage({
          type: 'error',
          message: '发送失败',
          appendTo: document.body
        })
      }
    }
  })


}
</script>

<style scoped lang="scss">
.form {
  .password-eye {
    pointer-events: auto;
    cursor: pointer;
  }
  .captcha-wrap {
    display: flex;
    align-items: center;
  }
}
</style>
