<template>
  <div class="profile-edit-container">
    <el-scrollbar class="scroll-bar">
      <div class="user-profile-edit-form-container">
        <span class="label">编辑资料</span>
        <UserProfileEditForm />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import UserProfileEditForm from '@/components/profile/UserProfileEditForm.vue'
</script>

<style scoped lang="scss">
.profile-edit-container {
  height: 100%;
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
