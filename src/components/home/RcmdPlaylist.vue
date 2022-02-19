<template>
  <div class="rcmd-playlist-wrap">
    <el-skeleton
      :loading="isLoading"
      animated
      class="skeleton-wrap"
    >
      <template #template>
        <div class="skeleton-item" v-for="(item, index) in 5" :key="index">
          <el-skeleton-item variant="image" class="image-skeleton"></el-skeleton-item>
          <el-skeleton-item class="title-skeleton"></el-skeleton-item>
        </div>
        <i></i><i></i><i></i><i></i><i></i>
      </template>
      <template #default>
        <div class="list-wrap">
          <RcmdListItem
            class="list-item"
            v-for="(item) in rcmdArr"
            :key="item.id"
            :info="item"
          />
          <!-- 占位元素，解决最后一行排列不一致 -->
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, ref } from 'vue'
import { getRecommendPlaylist } from '@/api/playlist'
import RcmdListItem from '@/components/home/RcmdPlaylistItem.vue'

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
    justify-content: space-between;
    .skeleton-item {
      width: 200px;
      margin-right: 20px;
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
    i {
      width: 200px;
      margin-right: 20px;
    }
  }
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-item {
      width: 200px;
      margin-right: 20px;
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
    i {
      width: 200px;
      margin-right: 20px;
    }
  }
}
</style>
