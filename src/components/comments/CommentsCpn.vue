<template>
  <div class="song-comment-wrap">
    <div class="hot-comments" v-if="hotComments.length">
      <h2 class="label">热门评论({{ hotComments.length }})</h2>
      <CommentsList
        :comments="hotComments"
      />
    </div>
    <div class="new-comments" v-if="count">
      <h2 class="label">最新评论({{ count }})</h2>
      <div class="content">
        <MyPagination
          :page-size="pageSize"
          :total="count"
          :page-data="pageData"
          @get-page="getPage"
          #default="{ currentPage, pageMap }"
        >
          <CommentsList
            :comments="pageMap.get(currentPage - 1)"
          />
        </MyPagination>
      </div>
    </div>
    <EmptyPlaceholder v-if="!hotComments.length && !count" text="暂无评论" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getMusicComment } from '@/api/music'
import { getPlaylistComment } from '@/api/playlist'
import { getAlbumComments } from '@/api/album'
import { getMvComments, getVideoComments } from '@/api/video'
import EmptyPlaceholder from '@/components/empty-placeholder/EmptyPlaceholder.vue'
import type { Comment } from '@/assets/types/comment'
import MyPagination from '@/components/pagination/MyPagination.vue'
import CommentsList from './CommentsList.vue'

const props = defineProps<{
  type: 'song' | 'playlist' | 'album' | 'mv' | 'video'
  id: number | string
}>()
const emit = defineEmits(['finishLoading'])

const count = ref(0)
const hotComments = ref<Comment[]>([])
const pageSize = ref(20)
const pageData = ref()

const getComments = async (type: 'hot' | 'new' | 'all', offset: number) => {
  let data: any = null
  const params = {
    id: props.id as any,
    offset: pageSize.value * offset,
  }
  if (props.type === 'song') {
    data = (await getMusicComment(params)).data
  } else if (props.type === 'playlist') {
    data = (await getPlaylistComment(params)).data
  } else if (props.type === 'album') {
    data = (await getAlbumComments(params)).data
  } else if (props.type === 'mv') {
    data = (await getMvComments(params)).data
  } else if (props.type === 'video') {
    data = (await getVideoComments(params)).data
  }

  const pushComments = (t: 'hot' | 'new'): Comment[] => {
    if (t === 'hot') {
      hotComments.value = data.hotComments
      return []
    }
    return data.comments as Comment[]
  }

  if (type === 'hot') {
    pushComments('hot')
  } else if (type === 'new') {
    pageData.value = pushComments('new')
  } else {
    pushComments('hot')
    pageData.value = pushComments('new')
    count.value = data.total
  }
}

const getPage = async (offset: number) => {
  await getComments('new', offset)
}

onBeforeMount(async () => {
  await getComments('all', 0)
  emit('finishLoading', count.value)
})
</script>

<style scoped lang="scss">
.song-comment-wrap {
  .label {
    color: $font-color;
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
  }
}
</style>
