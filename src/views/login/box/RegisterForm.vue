<template>
  <el-form
    class="form"
    :model="registerForm"
    :rules="registerRules"
    ref="formRef"
  >
    <el-form-item prop="phone">
      <el-input v-model="registerForm.phone" placeholder="请输入手机号">
        <template #prefix>
          <i class="iconfont icon-phone"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :type="isPasswordVisible ? 'text' : 'password'"
        v-model="registerForm.password"
        placeholder="请输入密码"
      >
        <template #prefix>
          <i class="iconfont icon-password"></i>
        </template>
        <template #suffix>
          <div
            @click="isPasswordVisible = !isPasswordVisible"
            class="password-eye"
          >
            <i v-if="isPasswordVisible" class="iconfont icon-nosee"></i>
            <i v-else class="iconfont icon-see"></i>
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input v-model="registerForm.nickname" placeholder="请输入昵称">
        <template #prefix>
          <i class="iconfont icon-nickname"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="registerForm.captcha" placeholder="请输入验证码">
        <template #prefix>
          <div class="captcha-wrap">
            <i class="iconfont icon-captcha"></i>
          </div>
        </template>
        <template #append>
          <el-button
            class="captcha-btn"
            @click="onClickCaptcha"
            :disabled="counter !== countdownTime"
            v-loading="isCaptchaLoading"
          >
            <span v-if="!isCaptchaLoading">
              {{ counter === countdownTime ? '获取验证码' : `重新获取${counter}s` }}
            </span>
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        style="width: 100%"
        @click="onClickRegister"
        type="primary"
      >注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import { sendCaptcha } from '@/api/login'
import { ElMessage } from 'element-plus'
import { register, checkIsRegistered } from '@/api/register'
import emitter from '@/utils/emitter'
import { useRouter } from 'vue-router'

const formRef = ref<InstanceType<typeof ElForm>>()
const isPasswordVisible = ref(false)
const countdownTime = 60
const counter = ref(countdownTime)
let timer: NodeJS.Timer | null = null
const isCaptchaLoading = ref(false)
const router = useRouter()

const registerForm = reactive({
  phone: '',
  password: '',
  nickname: '',
  captcha: '',
})

const validateIsRegistered = async (rule: any, value: any, callback: any) => {
  const rst = await checkIsRegistered({
    phone: registerForm.phone,
  })
  if (rst.data.exist === 1) {
    callback(new Error('该手机号已注册'))
  } else {
    callback()
  }
}
const registerRules = reactive({
  phone: [
    {
      required: true,
      message: '手机号不能为空！',
      trigger: 'blur',
    },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      message: '手机号不存在！',
      trigger: 'blur',
    },
    {
      validator: validateIsRegistered,
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空！',
      trigger: 'blur',
    },
  ],
  captcha: [
    {
      required: true,
      message: '验证码不能为空！',
      trigger: 'blur',
    },
  ],
  nickname: [
    {
      required: true,
      message: '昵称不能为空！',
      trigger: 'blur',
    },
  ],
})

const onClickCaptcha = () => {
  // 校验手机号
  formRef.value?.validateField('phone', async (notPass) => {
    if (!notPass) {
      isCaptchaLoading.value = true
      const rst = await sendCaptcha({
        phone: registerForm.phone,
      })
      isCaptchaLoading.value = false
      if (rst.data.code === 200) {
        counter.value -= 1
        timer = setInterval(() => {
          counter.value -= 1
          if (counter.value === 0) {
            clearInterval(timer!)
            timer = null
            counter.value = countdownTime
          }
        }, 1000)
      }
    }
  })
}
const onClickRegister = () => {
  if (formRef.value) {
    formRef.value.validate(async (result) => {
      if (result) {
        // 表单校验成功，发送请求
        emitter.emit('onToggleRegisterLoading', true) // 开启 loading
        const { data } = await register(registerForm)
        if (data.code === 200) {
          // 登录成功
          router.push({ name: 'home' })
          ElMessage({
            type: 'success',
            message: '注册成功！',
            appendTo: document.body,
          })
        } else {
          ElMessage({
            type: 'error',
            message: data.message,
            appendTo: document.body,
          })
        }
        emitter.emit('onToggleRegisterLoading', false) // 关闭 loading
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
  .captcha-wrap {
    display: flex;
    align-items: center;
  }
  :deep .el-input__inner {
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    --el-input-placeholder-color: rgba(255, 255, 255, 0.3);
    --el-input-text-color: #ddd;
  }
  :deep .circular {
    width: 20px;
  }
  :deep .el-input-group__append {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    .captcha-btn {
      width: 102px;
      background-color: transparent;
      display: flex;
    }
    .el-loading-mask {
      background-color: transparent;
      border-radius: 0;
    }
    span {
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
