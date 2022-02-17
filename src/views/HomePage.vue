<template>
  <div class="wrap">
    <el-scrollbar height="450px">
      <div class="banner">
        <span class="label">个性推荐</span>
        <el-carousel
          class="banner-carousel"
          v-if="bannerArr.length"
          type="card"
          :interval="5000"
          height="208px"
        >
          <el-carousel-item
            v-for="(item) in bannerArr"
            :key="item.targetId"
          >
            <div class="image-wrap">
              <el-image
                class="image"
                :src="item.imgUrl"
                @click="handleBannerClick(item.targetId)"
              ></el-image>
              <div
                class="label"
                :style="{ backgroundColor: item.titleColor }"
              >{{ item.typeTitle }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="rcmd-playlist">
        <span class="label">每日推荐</span>
        <RcmdPlaylist />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { getHomeBanner } from '@/api/home'
import { getMusicDetail } from '@/api/music'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'
import RcmdPlaylist from '@/views/RcmdPlaylist.vue'

/* 渲染数据 */
interface bannerType {
  imgUrl: string
  targetId: number
  titleColor: string
  typeTitle: string
}
const bannerArr = reactive<bannerType[]>([])
const getData = async () => {
  // 获取 banner
  const { data: bannerData } = await getHomeBanner()
  bannerData.banners.forEach((item: any) => {
    const obj = {
      imgUrl: item.imageUrl,
      targetId: item.targetId,
      titleColor: item.titleColor,
      typeTitle: item.typeTitle,
    }
    bannerArr.push(obj)
  })
}
onBeforeMount(() => {
  getData()
})

const { currentSong } = storeToRefs(useMainStore())
interface songType {
  id: number
  name: string
  alias: string
  author: { id: number, name: string }[]
  album: { name: string }
  duration: number
}
const handleBannerClick = async (id: number) => {
  const { data } = await getMusicDetail({ ids: id })
  const obj: songType = {
    id: data.songs[0].id,
    name: data.songs[0].name,
    alias: data.songs[0].alia[0],
    author: data.songs[0].ar,
    album: data.songs[0].al,
    duration: data.songs[0].dt,
  }
  currentSong.value = obj
}
</script>

<style scoped lang="scss">
.wrap {
  padding: 20px;
  .banner-carousel {
    .image-wrap {
      position: relative;
      .label {
        padding: 5px 10px;
        position: absolute;
        color: white;
        font-size: 14px;
        border-radius: 5px;
        z-index: 999;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
