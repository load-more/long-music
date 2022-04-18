<template>
  <div class="banner-wrap">
    <div>
      <el-carousel
        class="card-banner-carousel"
        v-if="bannerArr.length"
        type="card"
        :autoplay="true"
        :interval="5000"
        @change="handleBannerChange"
      >
        <el-carousel-item
          v-for="(item, index) in bannerArr"
          :key="item.targetId"
        >
          <div class="image-wrap">
            <el-image
              ref="cardImage"
              class="image"
              :src="item.imageUrl"
              @click="handleBannerClick(index, item)"
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
        :autoplay="true"
        :interval="5000"
        height="278px"
        @change="handleBannerChange"
      >
        <el-carousel-item
          v-for="(item, index) in bannerArr"
          :key="item.targetId"
        >
          <div class="image-wrap">
            <el-image
              class="image"
              :src="item.imageUrl"
              @click="handleBannerClick(index, item)"
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
import { onBeforeMount, ref } from 'vue'
import { getHomeBanner } from '@/api/home'
import { getMusicDetail } from '@/api/music'
import useMusicStore from '@/store/music'
import { bannerType } from '@/assets/ts/type'
import { resolveSongsDetail, resolveBanners } from '@/utils/resolve'

const emit = defineEmits(['finish-loading'])

const { updateCurrentSong, playMusic } = useMusicStore()

/* 渲染数据 */
const bannerArr = ref<bannerType[]>([])
const activeIndex = ref(0)

const getData = async () => {
  // 获取 banner
  const { data } = await getHomeBanner()
  bannerArr.value = resolveBanners(data.banners)
}

const handleBannerClick = async (index: number, banner: bannerType) => {
  if (index === activeIndex.value) {
    if (banner.targetType === 3000) { // 网址
      window.open(banner.url, '_blank')
    } else if (banner.targetType === 1) { // 歌曲
      const { data } = await getMusicDetail({ ids: banner.targetId })
      const song = resolveSongsDetail(data)[0]
      await updateCurrentSong(song)
      playMusic()
    } else if (banner.targetType === 10) { // 专辑
      //
    }
  }
}

const handleBannerChange = (index: number) => {
  activeIndex.value = index
}

onBeforeMount(async () => {
  await getData()
  emit('finish-loading')
})
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
  .el-carousel__item {
    display: flex;
    align-items: center;
    cursor: unset;
    &.is-active {
      .image {
        cursor: pointer;
      }
    }
  }
  :deep .el-carousel__mask {
    background-color: unset;
  }
}
</style>
