<template>
  <div class="banner-wrap">
    <div>
      <el-carousel
        id="home-card-carousel"
        class="card-banner-carousel"
        v-if="bannerArr.length"
        type="card"
        :autoplay="true"
        :interval="5000"
        :height="`${imgHeight / 2}px`"
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
        id="home-normal-carousel"
        class="normal-banner-carousel"
        v-if="bannerArr.length"
        :autoplay="true"
        :interval="5000"
        :height="`${imgHeight}px`"
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
              :ref="index === activeIndex ? 'activeCarouselImage' : ''"
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
import {
  onBeforeMount,
  ref,
  onMounted,
  watch,
} from 'vue'
import { getHomeBanner } from '@/api/home'
import { getMusicDetail } from '@/api/music'
import useMusicStore from '@/store/music'
import { bannerType } from '@/assets/ts/type'
import { resolveSongsDetail, resolveBanners } from '@/utils/resolve'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['finish-loading'])

const { updateCurrentSong, playMusic } = useMusicStore()
const { isSidebarExpand } = storeToRefs(useUserStore())

/* 渲染数据 */
const bannerArr = ref<bannerType[]>([])
const activeIndex = ref(0)
const router = useRouter()

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
      router.push({ name: 'album', params: { id: banner.targetId } })
    } else if (banner.targetType === 100) { // 歌手
      router.push({ name: 'artist', params: { id: banner.targetId } })
    } else if (banner.targetType === 1000) { // 歌单
      router.push({ name: 'playlist', params: { id: banner.targetId } })
    } else if (banner.targetType === 1004) { // MV
      router.push({ name: 'mv', params: { id: banner.targetId } })
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

const changeImgHeight = () => {
  if (isSidebarExpand.value) {
    return (document.body.clientWidth - 270) / 2.7
  }
  return (document.body.clientWidth - 90) / 2.7
}

const imgHeight = ref(changeImgHeight())

onMounted(() => {
  window.addEventListener('resize', () => {
    const cardCarousel = document.getElementById('home-card-carousel')
    const normalCarousel = document.getElementById('home-normal-carousel')
    cardCarousel?.classList.remove('is-expand')
    normalCarousel?.classList.remove('is-expand')
    imgHeight.value = changeImgHeight()
  })
})

watch(isSidebarExpand, () => {
  const cardCarousel = document.getElementById('home-card-carousel')
  const normalCarousel = document.getElementById('home-normal-carousel')
  cardCarousel?.classList.add('is-expand')
  normalCarousel?.classList.add('is-expand')
  imgHeight.value = changeImgHeight()
})
</script>

<style scoped lang="scss">
.banner-wrap {
  .card-banner-carousel {
    &.is-expand {
      :deep .el-carousel__container {
        transition: all 0.25s ease-in .25s;
      }
    }
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
    &.is-expand {
      :deep .el-carousel__container {
        transition: all 0.25s ease-in .25s;
      }
    }
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
    background-color: #fff;
  }
  .el-carousel__item {
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
