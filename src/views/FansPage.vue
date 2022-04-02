<template>
  <div class="fans-container">
    <el-scrollbar class="scroll-bar" v-show="!isLoading">
      <div class="user-relation-container">
        <span class="fans-label">“{{ nickname }}”的粉丝</span>
        <UserRelation
          :uid="Number(uid)"
          type="fans"
          :count="fansCount"
          @finish-loading="handleFinishLoading"
        />
      </div>
    </el-scrollbar>
    <LoadingAnimation v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import UserRelation from '@/components/common/UserRelation.vue'
import { getUserDetail } from '@/api/user'
import { useRoute } from 'vue-router'
import { Decrypt } from '@/utils/secret'
import LoadingAnimation from '@/components/common/LoadingAnimation.vue'

const route = useRoute()
const nickname = ref('')
const fansCount = ref(0)
const uid = route.params.id || Decrypt(String(window.localStorage.getItem('uid')))
const getData = async () => {
  const { data } = await getUserDetail({ uid })
  nickname.value = data.profile.nickname
  fansCount.value = data.profile.followeds
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
.fans-container {
  height: 100%;
  .scroll-bar {
    height: 100%;
  }
  .fans-label {
    font-size: 20px;
    font-family: 'yahei';
    display: inline-block;
    padding-bottom: 10px;
    color: $font-color;
  }
  .user-relation-container {
    padding: 20px;
  }
}
</style>
