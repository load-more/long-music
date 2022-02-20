<template>
  <div class="profile-container">
    <el-scrollbar class="scroll-bar">
      <div class="user-profile-container">
        <UserProfile />
      </div>
      <div class="user-playlist-container">
        <UserPlaylist />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import UserProfile from '@/components/profile/UserProfile.vue'
import UserPlaylist from '@/components/profile/UserPlaylist.vue'
</script>

<style scoped lang="scss">
.profile-container {
  height: 100%;
  .scroll-bar {
    height: 100%;
  }
  .user-profile-container, .user-playlist-container {
    padding: 20px;
  }
}
</style>
