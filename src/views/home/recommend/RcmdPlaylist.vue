<template>
  <div class="rcmd-playlist-wrap">
    <div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import { getRecommendPlaylist } from '@/api/playlist'
import { rcmdPlaylistType } from '@/assets/ts/type'
import RcmdListItem from './RcmdPlaylistItem.vue'

const emit = defineEmits(['finish-loading'])

/* 渲染数据 */
const rcmdArr = reactive<rcmdPlaylistType[]>([])
const getData = async () => {
  // 获取推荐歌单
  const { data: rcmdData } = await getRecommendPlaylist()
  rcmdData.recommend.forEach((item: any) => {
    const obj: rcmdPlaylistType = {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      playCount: item.playcount,
    }
    rcmdArr.push(obj)
  })
}
onBeforeMount(async () => {
  await getData()
  emit('finish-loading')
})
</script>

<style scoped lang="scss">
.rcmd-playlist-wrap {
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
  i {
    width: 200px;
    margin-right: 20px;
  }
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
