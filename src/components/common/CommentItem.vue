<template>
  <div
    class="comment-item-wrap"
    v-for="(comment) in comments"
    :key="comment.commentId"
  >
    <div class="left">
      <el-avatar
        :src="comment.userAvatar"
        class="avatar"
        @click="router.push({ name: 'profile', params: { id: comment.userId } })"
      ></el-avatar>
    </div>
    <div class="right">
      <div class="top">
        <div class="comment">
          <span
            class="user-name"
            @click="router.push({ name: 'profile', params: { id: comment.userId } })"
          >
            {{ comment.userName }}:
          </span>
          <span class="content">
            {{ comment.comment }}
          </span>
        </div>
        <div class="replied-comment" v-if="comment.repliedUserId">
          <span
            class="user-name"
            @click="router.push({ name: 'profile', params: { id: comment.repliedUserId } })"
          >
            @{{ comment.repliedUserName }}:
          </span>
          <span class="content">
            {{ comment.repliedComment }}
          </span>
        </div>
      </div>
      <div class="bottom">
        <span class="time">
          {{ comment.commentTime }}
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

export interface commentType {
  userId: number
  userAvatar: string
  userName: string
  comment: string
  repliedUserId: number
  repliedUserName: string
  repliedComment: string
  commentTime: string
  likedCount: number
  commentId: number
}
defineProps<{
  comments: commentType[]
}>()

const router = useRouter()
</script>

<style scoped lang="scss">
.comment-item-wrap {
  display: flex;
  color: $font-color;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  background-color: $bg-color-3;
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
      cursor: pointer;
      color: rgb(101, 101, 255);
      &:hover {
        color: $font-active-color;
      }
    }
    .comment {
      margin-bottom: 10px;
    }
    .replied-comment {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      background-color: $bg-color-2;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: $font-inactive-color;
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
