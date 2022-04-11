<template>
  <div class="song-comment-wrap">
    <div class="hot-comments">
      <h2 class="label">热门评论({{ hotComments.length }})</h2>
      <CommentItem
        :comments="hotComments"
      />
    </div>
    <div class="new-comments">
      <h2 class="label">最新评论({{ commentCount }})</h2>
      <div class="content" v-show="!isLoading">
        <keep-alive>
          <CommentItem
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
        >
        </el-pagination>
      </div>
    </div>
    <LoadingAnimation class="loading-animation" v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getMusicComment } from '@/api/music'
import CommentItem, { commentType } from '@/components/common/CommentItem.vue'
import LoadingAnimation from '@/components/common/LoadingAnimation.vue'

const props = defineProps<{
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
  const { data } = await getMusicComment({
    id: props.id,
    offset: pageSize.value * offset,
  })

  const pushComments = (t: 'hot' | 'new') => {
    const raw = t === 'hot' ? data.hotComments : data.comments
    const arr: commentType[] = []
    raw.forEach((item: any) => {
      const obj = {
        userId: item.user.userId,
        userAvatar: item.user.avatarUrl,
        userName: item.user.nickname,
        comment: item.content,
        repliedUserId: item.beReplied[0] ? item.beReplied[0].user.userId : null,
        repliedUserName: item.beReplied[0] ? item.beReplied[0].user.nickname : null,
        repliedComment: item.beReplied[0] ? item.beReplied[0].content : null,
        commentTime: item.timeStr,
        likedCount: item.likedCount,
        commentId: item.commentId,
      }
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
  getComments('all', 0)
  emit('finishLoading')
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
