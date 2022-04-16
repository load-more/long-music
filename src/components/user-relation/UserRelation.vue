<template>
  <div class="user-relation-wrap">
    <div class="user-relation-item-wrap" v-show="!isLoading">
      <keep-alive>
        <UserRelationItem
          :uid="id"
          :relation="pageMap.get(currentPage - 1)"
          :type="type"
          @update-array="handleUpdateArray(currentPage, $event)"
        />
      </keep-alive>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="count"
        v-model:current-page="currentPage"
        @current-change="handleCurrentChange"
        hide-on-single-page
      >
      </el-pagination>
    </div>
    <EmptyPlaceholder v-if="!count" :text="placeholderText" />
    <LoadingAnimation class="loading-animation" v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { getUserFollows, getUserFans } from '@/api/user'
import { getPlaylistSubsribers } from '@/api/playlist'
import LoadingAnimation from '@/components/loading/LoadingAnimation.vue'
import EmptyPlaceholder from '@/components/empty-placeholder/EmptyPlaceholder.vue'
import { userBriefType } from '@/assets/ts/type'
import { resolveUserBrief } from '@/utils/resolve'
import UserRelationItem from './UserRelationItem.vue'

const props = defineProps<{
  id: number
  type: 'follows' | 'fans' | 'subscribers'
  count: number
}>()
const emit = defineEmits(['finish-loading'])

const pageSize = ref(30)
const currentPage = ref(1)
const pageMap = ref(new Map())
const isLoading = ref(false)

const placeholderText = computed(() => {
  if (props.type === 'follows') {
    return '暂无关注者'
  }
  if (props.type === 'fans') {
    return '暂无粉丝'
  }
  return '暂无收藏者'
})

const getData = async (offset: number) => {
  if (pageMap.value.has(offset)) return
  isLoading.value = true
  let data

  if (props.type === 'follows') {
    data = (await getUserFollows({
      uid: props.id,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })).data.follow
  } else if (props.type === 'fans') {
    data = (await getUserFans({
      uid: props.id,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })).data.followeds
  } else if (props.type === 'subscribers') {
    data = (await getPlaylistSubsribers({
      id: props.id,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })).data.subscribers
  }

  const arr: userBriefType[] = []
  data.forEach((item: any) => {
    const obj = resolveUserBrief(item)
    arr.push(obj)
  })

  pageMap.value.set(offset, arr)
  isLoading.value = false
  emit('finish-loading')
}

const handleCurrentChange = () => {
  getData(currentPage.value - 1)
}

const handleUpdateArray = (page: number, uid: number) => {
  const index = pageMap.value.get(page - 1).findIndex((item: userBriefType) => item.userId === uid)
  pageMap.value.get(page - 1)[index].followed = true
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
    padding: 40px 0;
    font-size: 3px;
  }
}
</style>
