<template>
  <div>
    <span class="user-count">为您找到 {{ userCount }} 个用户</span>
    <div class="item-wrap">
      <UserItem
        class="item"
        v-for="(user) in users"
        :key="user.userId"
        :user="user"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { userBriefType } from '@/assets/ts/type'
import { resolveUserBrief } from '@/utils/resolve'
import UserItem from '@/components/user/UserItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})
const users = ref<userBriefType[]>([])
const userCount = ref(0)

const getData = async () => {
  const { data } = await getSearchResult({
    type: 1002,
    keywords: keyword.value || '',
  })
  data.result.userprofiles.forEach((user: any) => {
    users.value.push(resolveUserBrief(user))
  })
  userCount.value = data.result.userprofileCount
}

onBeforeMount(async () => {
  await getData()
})
</script>

<style scoped lang="scss">
.user-count {
  font-size: 12px;
  color: $font-inactive-color;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
