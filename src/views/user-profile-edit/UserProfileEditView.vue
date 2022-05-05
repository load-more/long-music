<template>
  <div class="profile-edit-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="user-profile-edit-form-container">
        <span class="label">编辑资料</span>
        <UserProfileEditForm @finish-loading="isLoading = false" />
      </div>
    </el-scrollbar>
    <WaveSpinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'
import UserProfileEditForm from './form/UserProfileEditForm.vue'

const isLoading = ref(true)
</script>

<style scoped lang="scss">
.profile-edit-container {
  height: 100%;
  color: $font-color;
  .scroll-bar {
    height: 100%;
  }
  .label {
    font-family: 'yahei';
    font-size: 20px;
    display: inline-block;
    padding-bottom: 20px;
  }
  .user-profile-edit-form-container {
    padding: 20px;
  }
}
</style>
