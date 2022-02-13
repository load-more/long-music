<template>
  <div class="wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="歌曲列表" name="list">
        <div class="topbar">
          <div class="operation">
            <span>操作</span>
          </div>
          <div class="title">
            <span>标题</span>
          </div>
          <div class="singer">
            <span>歌手</span>
          </div>
          <div class="album">
            <span>专辑</span>
          </div>
          <div class="duration">
            <span>时间</span>
          </div>
        </div>
        <div class="list">
          <ul
            class="infinite-list"
            v-infinite-scroll="loadItem"
            :infinite-scroll-disabled="isScrollDisabled"
            :infinite-scroll-immediate="false"
          >
            <ListItem
              v-for="(item, index) in songArr"
              :key="item.id"
              :song-info="item"
              :song-index="index + 1"
            />
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="comment">
        Comments
      </el-tab-pane>
      <el-tab-pane label="收藏者" name="subscriber">
        Subscribers
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import ListItem, { songType } from '@/components/music/ListItem.vue'
import { getPlaylistAllSongs } from '@/api/playlist'
import { useRoute } from 'vue-router'

const props = defineProps<{
  songCount: number
}>()

/* 路由管理 */
const route = useRoute()

/* 渲染数据 */
const { id } = route.params
const offset = ref(0)
const limit = 20

const songArr = reactive<songType[]>([])
const getData = async (lim: number, offs: number) => {
  const { data } = await getPlaylistAllSongs({
    id: Number(id),
    limit: lim,
    offset: offs,
  })
  data.songs.forEach((item: any) => {
    const obj: songType = {
      id: item.id,
      name: item.name,
      alias: item.alia[0],
      author: item.ar,
      album: item.al,
      duration: item.dt,
    }
    songArr.push(obj)
  })
}
onBeforeMount(async () => {
  await getData(limit, offset.value)
  offset.value += 1
})

/* 加载数据 */
const isScrollDisabled = ref(false)

const loadItem = async () => {
  // 之前加载的歌曲数量
  const previousSongs = offset.value * limit
  // 如果还剩最后一组未加载，则加载完之后关闭无限滚动
  if (previousSongs + limit > props.songCount) {
    // 如果 offset 超出了最大偏移量，则 offset 重置为最大偏移量
    // 所以 offset 设置为最大安全整数，是获取最后一组数据
    await getData(props.songCount - previousSongs, Number.MAX_SAFE_INTEGER)
    isScrollDisabled.value = true
  } else {
    await getData(limit, offset.value)
    offset.value += 1
  }
}
const activeTab = ref('list')
</script>

<style scoped lang="scss">
.wrap {
  .topbar {
    display: flex;
    text-align: center;
    padding-bottom: 10px;
    .operation {
      width: 100px;
    }
    .title {
      flex: 1;
    }
    .singer {
      flex: 1;
    }
    .album {
      flex: 1;
    }
    .duration {
      width: 70px;
    }
  }
  .list {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    .infinite-list {
      position: absolute;
      left: 0;
      top: 0;
      right: -17px;
      bottom: 0;
      overflow-y: scroll;
      height: 400px;
      display: block;
      list-style-type: none;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 0;
    }
  }
}
</style>
