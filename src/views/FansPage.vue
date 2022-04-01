<template>
  <div class="fans-container">
    <el-scrollbar class="scroll-bar">
      <div class="user-relation-container">
        <span class="fans-label">“{{ nickname }}”的粉丝</span>
        <UserRelation :uid="uid" type="fans" />
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
