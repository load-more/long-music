<template>
  <div class="wrap">
    <RcmdListItem
      v-for="(item) in rcmdArr"
      :key="item.id"
      :info="item"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
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
})
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}
</style>
