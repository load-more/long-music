<template>
  <div class="rcmd-playlist-wrap">
    <el-skeleton
      :loading="isLoading"
      animated
      class="skeleton-wrap"
      :count="5"
    >
      <template #template>
        <div class="skeleton-item">
          <el-skeleton-item variant="image" class="image-skeleton"></el-skeleton-item>
          <el-skeleton-item class="title-skeleton"></el-skeleton-item>
        </div>
      </template>
      <template #default>
        <div class="list-wrap">
          <RcmdListItem
            class="list-item"
            v-for="(item) in rcmdArr"
            :key="item.id"
            :info="item"
          />
        </div>
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
.rcmd-playlist-wrap {
  .skeleton-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .skeleton-item {
      flex: 1;
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
  }
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      flex: 1;
      // width: 200px;
      // @media screen and (max-width: 1200px) {
      //   width: 25%;
      // }
      // @media screen and (max-width: 992px) {
      //   width: 33.3%;
      // }
      // @media screen and (max-width: 768px) {
      //   width: 50%;
      // }
    }
  }
  // 使用伪元素实现最后一行排列方式一致
  .skeleton-wrap::after, .list-wrap::after {
    content: '';
    flex: 1;
  }
}
</style>
