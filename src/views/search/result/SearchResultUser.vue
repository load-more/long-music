<template>
  <div>
    <span class="user-count">为您找到 {{ userCount }} 个用户</span>
    <MyPagination
      :page-size="pageSize"
      :total="userCount"
      :page-data="pageData"
      @get-page="getPage"
      #default="{ currentPage, pageMap }"
    >
      <div class="item-wrap">
        <UserItem
          class="item"
          v-for="(user) in pageMap.get(currentPage - 1)"
          :key="user.userId"
          :user="user"
        />
      </div>
    </MyPagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchResult } from '@/api/search'
import { resolveUserBrief } from '@/utils/resolve'
import MyPagination from '@/components/pagination/MyPagination.vue'
import UserItem from '@/components/user/UserItem.vue'

const route = useRoute()
const keyword = computed(() => {
  if (Array.isArray(route.query.kw)) {
    return route.query.kw.join(' ')
  }
  return route.query.kw
})

const userCount = ref(0)
const pageSize = ref(30)
const pageData = ref()

const getPage = async (offset: number) => {
  const { data } = await getSearchResult({
    type: 1002,
    keywords: keyword.value || '',
    limit: pageSize.value,
    offset: pageSize.value * offset,
  })
  const arr: any[] = []
  data.result.userprofiles.forEach((user: any) => {
    arr.push(resolveUserBrief(user))
  })
  pageData.value = arr
  userCount.value = data.result.userprofileCount
}

onBeforeMount(async () => {
  getPage(0)
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
