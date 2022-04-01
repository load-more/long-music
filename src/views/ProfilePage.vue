<template>
  <div class="profile-container">
    <el-scrollbar class="scroll-bar">
      <div class="user-profile-container">
        <UserProfile :uid="uid" />
      </div>
      <div class="user-playlist-container">
        <UserPlaylist :uid="uid" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Decrypt } from '@/utils/secret'
import UserProfile from '@/components/profile/UserProfile.vue'
import UserPlaylist from '@/components/profile/UserPlaylist.vue'

const route = useRoute()
const uid = route.params.id || Decrypt(String(window.localStorage.getItem('uid')))
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
