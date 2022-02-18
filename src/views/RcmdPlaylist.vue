<template>
  <div class="rcmd-playlist-wrap">
    <el-skeleton
      :loading="isLoading"
      animated
      class="skeleton"
      :count="5"
    >
      <template #template>
        <div class="item">
          <el-skeleton-item variant="image" class="image-skeleton"></el-skeleton-item>
          <el-skeleton-item class="title-skeleton"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <RcmdListItem
          v-for="(item) in rcmdArr"
          :key="item.id"
          :info="item"
        />
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, ref } from 'vue'
import { getRecommendPlaylist } from '@/api/playlist'
import RcmdListItem from '@/components/playlist/RcmdListItem.vue'

/* 渲染数据 */
interface rcmdType {
  id: number
  name: string
  picUrl: string
  playCount: number
}
const rcmdArr = reactive<rcmdType[]>([])
const isLoading = ref(true)
onBeforeMount(async () => {
  // 获取推荐歌单
  const { data: rcmdData } = await getRecommendPlaylist()
  rcmdData.recommend.forEach((item: any) => {
    const obj: rcmdType = {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      playCount: item.playcount,
    }
    rcmdArr.push(obj)
  })
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.rcmd-playlist-wrap, .skeleton {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
.skeleton .item {
  width: 20%;
}
.rcmd-playlist-wrap {
  .image-skeleton {
    width: 200px;
    height: 200px;
    border-radius: 5px;
  }
  .title-skeleton {
    margin-top: 10px;
    width: 200px;
    height: 30px;
  }
}
</style>
