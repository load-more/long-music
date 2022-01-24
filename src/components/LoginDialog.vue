<template class="dialog-wrap">
  <el-dialog v-model="dialogVisible" title="登录 / 注册" class="dialog">
    <el-form
      class="form"
      :model="phoneLoginForm"
      style="max-width: 460px"
    >
      <el-form-item class="form-item-phone">
        <el-input
          v-model="phoneLoginForm.phone"
          placeholder="请输入手机号"
        >
          <template #prefix>
            <i class="iconfont icon-phone"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-password">
        <el-input
          type="password"
          v-model="phoneLoginForm.password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <i class="iconfont icon-password"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-auto-login">
        <el-checkbox v-model="isAutoLogin" label="自动登录" size="small"></el-checkbox>
      </el-form-item>
      <el-form-item class="form-item-login">
        <el-button type="primary" style="width: 100%;">登录</el-button>
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
import { ref, defineEmits, watch, reactive } from 'vue'

const emit = defineEmits(['closeDialog'])
const dialogVisible = ref(true)
const phoneLoginForm = reactive({
  phone: '',
  password: ''
})
const isAutoLogin = ref(false)

watch(dialogVisible, () => {
  emit('closeDialog', dialogVisible.value)
})
</script>

<style scoped lang="scss">
.form {
  .form-item-phone, .form-item-login {
    margin-bottom: 5px;
  }
  .form-item-password, .form-item-auto-login {
    margin-bottom: 10px;
  }
  .other-methods {
    font-size: 12px;
    color: gray;
  }
}
</style>
