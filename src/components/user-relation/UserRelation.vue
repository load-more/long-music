<template>
  <div class="user-relation-wrap">
    <div class="user-relation-item-wrap">
      <MyPagination
        :page-size="pageSize"
        :total="count"
        :page-data="pageData"
        @get-page="getPage"
        #default="{ currentPage, pageMap }"
      >
        <UserRelationList
          :uid="id"
          :users="pageMap.get(currentPage - 1)"
          :type="type"
        />
      </MyPagination>
    </div>
    <EmptyPlaceholder v-if="!count" :text="placeholderText" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { getUserFollows, getUserFans } from '@/api/user'
import { getPlaylistSubsribers } from '@/api/playlist'
import EmptyPlaceholder from '@/components/empty-placeholder/EmptyPlaceholder.vue'
import { User } from '@/assets/types/user'
import MyPagination from '@/components/pagination/MyPagination.vue'
import UserRelationList from './UserRelationList.vue'

const props = defineProps<{
  id: number
  type: 'follows' | 'fans' | 'subscribers'
  count: number
}>()
const emit = defineEmits(['finish-loading'])

const pageSize = ref(30)
const pageData = ref()

const placeholderText = computed(() => {
  if (props.type === 'follows') {
    return '暂无关注者'
  }
  if (props.type === 'fans') {
    return '暂无粉丝'
  }
  return '暂无收藏者'
})

const getPage = async (offset: number) => {
  let userArr: User[] = []

  if (props.type === 'follows') {
    userArr = (await getUserFollows({
      uid: props.id,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })).data.follow
  } else if (props.type === 'fans') {
    userArr = (await getUserFans({
      uid: props.id,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })).data.followeds
  } else if (props.type === 'subscribers') {
    userArr = (await getPlaylistSubsribers({
      id: props.id,
      limit: pageSize.value,
      offset: pageSize.value * offset,
    })).data.subscribers
  }

  pageData.value = userArr
}

onBeforeMount(async () => {
  await getPage(0)
  emit('finish-loading')
})
</script>

<style scoped lang="scss">

</style>
