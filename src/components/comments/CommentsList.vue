<template>
  <div
    class="comments-list-wrap"
    v-for="(comment) in comments"
    :key="comment.commentId"
  >
    <div class="left">
      <el-avatar
        :src="`${comment.user.avatarUrl}?param=40y40`"
        class="avatar"
        @click="router.push({ name: 'user', params: { id: comment.user.userId } })"
      ></el-avatar>
    </div>
    <div class="right">
      <div class="top">
        <div class="comment">
          <span
            class="user-name"
            @click="router.push({ name: 'user', params: { id: comment.user.userId } })"
          >
            {{ comment.user.nickname }}:
          </span>
          <span class="content">
            {{ comment.content }}
          </span>
        </div>
        <div class="replied-comment" v-if="comment.beReplied[0]">
          <span
            class="user-name"
            @click="router.push({ name: 'user', params: { id: comment.beReplied[0].user.userId } })"
          >
            @{{ comment.beReplied[0].user.nickname }}:
          </span>
          <span class="content">
            {{ comment.beReplied[0].content }}
          </span>
        </div>
      </div>
      <div class="bottom">
        <span class="time">
          {{ comment.timeStr }}
        </span>
        <span>
          <i class="iconfont icon-thumb-up-line">
            <span class="like-count">
              {{ comment.likedCount }}
            </span>
          </i>
          <i class="iconfont icon-comment"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Comment } from '@/assets/types/comment'

defineProps<{
  comments: Comment[]
}>()

const router = useRouter()
</script>

<style scoped lang="scss">
.comments-list-wrap {
  display: flex;
  color: $font-color;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  background-color: $item-color-1;
  font-size: 14px;
  .left {
    margin-right: 20px;
    .avatar {
      cursor: pointer;
    }
  }
  .right {
    flex-grow: 1;
    .user-name {
      @include user-name-color;
    }
    .comment {
      margin-bottom: 10px;
    }
    .replied-comment {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      background-color: $item-active-color;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: $font-deep-color;
      i {
        margin-left: 20px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: $font-active-color;
        }
      }
    }
  }
}
</style>
