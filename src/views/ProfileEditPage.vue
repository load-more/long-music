<template>
  <div class="profile-edit-container">
    <h2>编辑资料</h2>
    <UserProfileEditForm />
  </div>
</template>

<script setup lang="ts">
import UserProfileEditForm from '@/components/profile/UserProfileEditForm.vue'
</script>

<style scoped lang="scss">
.profile-edit-container {
  padding: 20px;
}
</style>
