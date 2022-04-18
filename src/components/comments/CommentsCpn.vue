<template>
  <div class="song-comment-wrap">
    <div class="hot-comments" v-if="hotComments.length">
      <h2 class="label">热门评论({{ hotComments.length }})</h2>
      <CommentsItem
        :comments="hotComments"
      />
    </div>
    <div class="new-comments" v-if="commentCount">
      <h2 class="label">最新评论({{ commentCount }})</h2>
      <div class="content" v-show="!isLoading">
        <keep-alive>
          <CommentsItem
            :comments="newCommentsMap.get(currentPage - 1)"
          />
        </keep-alive>
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="commentCount"
          v-model:current-page="currentPage"
          @current-change="handleNewCommentsChange"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
    <EmptyPlaceholder v-if="!hotComments.length && !commentCount" text="暂无评论" />
    <LoadingAnimation class="loading-animation" v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getMusicComment } from '@/api/music'
import { getPlaylistComment } from '@/api/playlist'
import { getAlbumComments } from '@/api/album'
import LoadingAnimation from '@/components/loading/LoadingAnimation.vue'
import EmptyPlaceholder from '@/components/empty-placeholder/EmptyPlaceholder.vue'
import { commentType } from '@/assets/ts/type'
import { resolveComment } from '@/utils/resolve'
import CommentsItem from './CommentsItem.vue'

const props = defineProps<{
  type: 'song' | 'playlist' | 'album'
  id: number
}>()
const emit = defineEmits(['finishLoading'])

const commentCount = ref(0)
const hotComments = ref<commentType[]>([])
const pageSize = ref(20)
const currentPage = ref(1)
const newCommentsMap = ref(new Map())
const isLoading = ref(false)

const getComments = async (type: 'hot' | 'new' | 'all', offset: number) => {
  if (type === 'new' && newCommentsMap.value.has(offset)) return
  isLoading.value = true
  let data: any = null
  const params = {
    id: props.id,
    offset: pageSize.value * offset,
  }
  if (props.type === 'song') {
    data = (await getMusicComment(params)).data
  } else if (props.type === 'playlist') {
    data = (await getPlaylistComment(params)).data
  } else if (props.type === 'album') {
    data = (await getAlbumComments(params)).data
  }

  const pushComments = (t: 'hot' | 'new') => {
    const raw = t === 'hot' ? data.hotComments : data.comments
    const arr: commentType[] = []
    raw.forEach((item: any) => {
      const obj: commentType = resolveComment(item)
      if (t === 'hot') {
        hotComments.value.push(obj)
      } else {
        arr.push(obj)
      }
    })
    return arr
  }

  if (type === 'hot') {
    pushComments('hot')
  } else if (type === 'new') {
    newCommentsMap.value.set(offset, pushComments('new'))
  } else {
    pushComments('hot')
    newCommentsMap.value.set(offset, pushComments('new'))
    commentCount.value = data.total
  }
  isLoading.value = false
}

const getData = async () => {
  await getComments('all', 0)
  emit('finishLoading', commentCount.value)
}

const handleNewCommentsChange = () => {
  getComments('new', currentPage.value - 1)
}

onBeforeMount(() => {
  getData()
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
  .pagination {
    display: flex;
    justify-content: center;
  }
  .loading-animation {
    margin: 80px 0;
    font-size: 3px;
  }
}
</style>
