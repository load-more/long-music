<template>
  <div class="banner-wrap">
    <div>
      <el-carousel
        class="card-banner-carousel"
        v-if="bannerArr.length"
        type="card"
        :autoplay="false"
      >
        <el-carousel-item
          v-for="(item) in bannerArr"
          :key="item.targetId"
        >
          <div class="image-wrap">
            <el-image
              ref="cardImage"
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
      <el-carousel
        class="normal-banner-carousel"
        v-if="bannerArr.length"
        :autoplay="false"
        height="278px"
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
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { getHomeBanner } from '@/api/home'
import { getMusicDetail } from '@/api/music'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['finish-loading'])

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
  emit('finish-loading')
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
.banner-wrap {
  :deep .el-carousel__container {
    height: 208px;
  }
  .card-banner-carousel {
    .image-wrap {
      position: relative;
      width: 100%;
      .image {
        // width: 600px;
        border-radius: 10px;
        // 去除图片垂直方向上的间隙
        vertical-align: bottom;
      }
      .label {
        padding: 5px 10px;
        position: absolute;
        color: #fff;
        font-size: 14px;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        z-index: 999;
        right: 0;
        bottom: 0;
      }
    }
    @media screen and (max-width: 992px) {
      display: none;
    }
  }
  .normal-banner-carousel {
    display: none;
    .image-wrap {
      position: relative;
      width: 100%;
      .image {
        border-radius: 10px;
        // 去除图片垂直方向上的间隙
        vertical-align: bottom;
      }
      .label {
        padding: 5px 10px;
        position: absolute;
        color: #fff;
        font-size: 14px;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        z-index: 999;
        right: 0;
        bottom: 0;
      }
    }
    @media screen and (max-width: 992px) {
      display: block;
    }
  }
  :deep .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $carousel-button-color;
  }
}
</style>
