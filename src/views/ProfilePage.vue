<template>
  <div class="profile-container">
    <el-scrollbar height="450px">
      <UserProfile />
      <UserPlaylist />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import UserProfile from '@/components/profile/UserProfile.vue'
import UserPlaylist from '@/components/profile/UserPlaylist.vue'
</script>

<style scoped lang="scss">
.profile-container {
  padding: 20px;
}
</style>
