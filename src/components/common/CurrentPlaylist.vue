<template>
  <div class="current-playlist-wrap">
    <el-scrollbar class="scroll-bar">
      <div
        class="item"
        v-for="(item) in songArr"
        :key="item.id"
      >
        <div class="title single-line-ellipsis" :title="item.title">
          <span>{{ item.title }}</span>
        </div>
        <div class="singer single-line-ellipsis" :title="item.author">
          <span>{{ item.author }}</span>
        </div>
        <div class="duration single-line-ellipsis">
          <span>{{ item.duration }}</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
const songArr = [
  {
    id: 1,
    title: 'title',
    author: 'author',
    duration: '04:22',
  },
  {
    id: 2,
    title: 'title',
    author: 'author',
    duration: '04:22',
  },
  {
    id: 3,
    title: 'title',
    author: 'author',
    duration: '04:22',
  },
]
</script>

<style scoped lang="scss">
.current-playlist-wrap {
  width: 100%;
  height: 100%;
  .scroll-bar {
    height: 100%;
    .item {
      padding: 10px 0;
      margin-right: 20px;
      border-radius: 5px;
      background-color: #2e2e30;
      margin-bottom: 10px;
      display: flex;
      font-size: 12px;
      line-height: 20px;
      .title {
        padding: 0 5px;
        flex: 3;
      }
      .singer {
        flex: 2;
        color: gray;
      }
      .duration {
        width: 40px;
        color: gray;
      }
    }
    .active {
      background-color: #644a4a;
      .title, .singer {
        color: rgb(155, 0, 0);
      }
    }
  }
}
</style>
