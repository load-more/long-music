<template>
  <div class="follows-container">
    <el-scrollbar class="scroll-bar">
      <div class="user-relation-container">
        <span class="follows-label">“{{ nickname }}”的关注</span>
        <UserRelation :uid="Number(uid)" type="follows" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import UserRelation from '@/components/common/UserRelation.vue'
import { getUserDetail } from '@/api/user'
import { useRoute } from 'vue-router'
import { Decrypt } from '@/utils/secret'

const route = useRoute()
const nickname = ref('')
const uid = route.params.id || Decrypt(String(window.localStorage.getItem('uid')))
const getData = async () => {
  const { data } = await getUserDetail({ uid })
  nickname.value = data.profile.nickname
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
    padding: 20px;
  }
}
</style>
