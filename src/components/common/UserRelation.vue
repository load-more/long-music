<template>
  <div class="user-relation-wrap">
    <div class="user-relation-item-wrap" v-show="!isLoading">
      <keep-alive>
        <UserRelationItem
          :relation="pageMap.get(currentPage - 1)"
        />
      </keep-alive>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="count"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <LoadingAnimation class="loading-animation" v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getUserFollows, getUserFans } from '@/api/user'
import UserRelationItem, { userType } from '@/components/common/UserRelationItem.vue'
import LoadingAnimation from '@/components/common/LoadingAnimation.vue'

const props = defineProps<{
  uid: number
  type: 'follows' | 'fans'
  count: number
}>()
const emit = defineEmits(['finish-loading'])

const pageSize = ref(30)
const currentPage = ref(1)
const pageMap = ref(new Map())
const isLoading = ref(false)

const getData = async (offset: number) => {
  if (props.type === 'follows') {
    if (pageMap.value.has(offset)) return
    isLoading.value = true
    const { data } = await getUserFollows({
      uid: props.uid,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })
    const arr: userType[] = []
    data.follow.forEach((item: userType) => {
      arr.push({
        userId: item.userId,
        nickname: item.nickname,
        signature: item.signature,
        playlistCount: item.playlistCount,
        followeds: item.followeds,
        follows: item.follows,
        avatarUrl: item.avatarUrl,
      })
    })
    pageMap.value.set(offset, arr)
    isLoading.value = false
  } else {
    if (pageMap.value.has(offset)) return
    isLoading.value = true
    const { data } = await getUserFans({
      uid: props.uid,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })
    const arr: userType[] = []
    data.followeds.forEach((item: userType) => {
      arr.push({
        userId: item.userId,
        nickname: item.nickname,
        signature: item.signature,
        playlistCount: item.playlistCount,
        followeds: item.followeds,
        follows: item.follows,
        avatarUrl: item.avatarUrl,
      })
    })
    pageMap.value.set(offset, arr)
    isLoading.value = false
  }
  emit('finish-loading')
}

const handleCurrentChange = () => {
  getData(currentPage.value - 1)
}

onBeforeMount(() => {
  getData(currentPage.value - 1)
})
</script>

<style scoped lang="scss">
.user-relation-wrap {
  width: 100%;
  height: 100%;
  .pagination {
    display: flex;
    justify-content: center;
  }
  .loading-animation {
    margin-top: 40px;
    font-size: 3px;
  }
}
</style>
