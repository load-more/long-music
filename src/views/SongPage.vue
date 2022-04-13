<template>
  <div class="song-container">
    <el-scrollbar v-show="!isLoading">
      <div class="top">
        <SongDetail :id="songId" @finish-loading="handleFinishLoading" />
      </div>
      <div class="bottom">
        <SongComment :id="songId" type="song" @finish-loading="handleFinishLoading" />
      </div>
    </el-scrollbar>
    <LoadingAnimation v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SongDetail from '@/components/song/SongDetail.vue'
import SongComment from '@/components/song/SongComment.vue'
import LoadingAnimation from '@/components/common/LoadingAnimation.vue'

const route = useRoute()
const songId = Number(route.params.id)
const isLoading = ref(true)

const loadedCount = ref(0)
const handleFinishLoading = () => {
  loadedCount.value += 1
  if (loadedCount.value === 2) {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.song-container {
  height: 100%;
  .top, .bottom {
    padding: 20px;
  }
}
</style>
