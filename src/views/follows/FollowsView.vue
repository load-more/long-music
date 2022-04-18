<template>
  <div class="follows-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="user-relation-container">
        <span class="follows-label">“{{ nickname }}”的关注</span>
        <UserRelation
          :id="uid"
          type="follows"
          :count="followsCount"
          @finish-loading="handleFinishLoading"
        />
      </div>
    </el-scrollbar>
    <LoadingAnimation v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getUserDetail } from '@/api/user'
import { useRoute } from 'vue-router'
import UserRelation from '@/components/user-relation/UserRelation.vue'
import LoadingAnimation from '@/components/loading/LoadingAnimation.vue'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'

const { userDetail } = storeToRefs(useUserStore())

const route = useRoute()
const nickname = ref('')
const followsCount = ref(0)
const uid = Number(route.params.id) || userDetail.value.userId
const getData = async () => {
  const { data } = await getUserDetail({ uid })
  nickname.value = data.profile.nickname
  followsCount.value = data.profile.follows
}

const isLoading = ref(true)
const loadedCount = ref(0)
const handleFinishLoading = () => {
  loadedCount.value += 1
  if (loadedCount.value === 1) {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.follows-container {
  height: 100%;
  .scroll-bar {
    height: 100%;
  }
  .follows-label {
    font-size: 20px;
    font-family: 'yahei';
    display: inline-block;
    padding-bottom: 10px;
    color: $font-color;
  }
  .user-relation-container {
    height: 100%;
    padding: 20px;
  }
}
</style>
