<template>
  <div class="rcmd-playlist-wrap">
    <el-skeleton
      :loading="isLoading"
      animated
      class="skeleton-wrap"
    >
      <template #template>
        <div class="skeleton-item" v-for="(item, index) in 5" :key="index">
          <div class="image-wrap">
            <el-skeleton-item variant="image" class="image-skeleton"></el-skeleton-item>
          </div>
          <div class="title-wrap">
            <el-skeleton-item class="title-skeleton"></el-skeleton-item>
          </div>
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
          <!-- 占位元素，解决最后一行排列不一致(放弃这种做法，改用百分比) -->
          <!-- <i></i><i></i><i></i><i></i><i></i> -->
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
    .skeleton-item {
      box-sizing: border-box;
      width: 20%;
      padding-right: 20px;
      @media screen and (max-width: 992px) {
        width: 25%;
      }
      @media screen and (max-width: 768px) {
        width: 33.3%;
      }
      .image-wrap {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
        .image-skeleton {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .title-wrap {
        width: 100%;
        .title-skeleton {
          margin-top: 10px;
          margin-bottom: 15px;
          height: 40px;
        }
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
  }
}
</style>
