<template>
  <el-popover
    v-model:visible="popperVisible"
    placement="bottom"
    :width="600"
    :show-arrow="false"
    popper-class="video-tags-popper"
  >
    <template #reference>
      <el-button
        class="btns"
        @click.stop="popperVisible = !popperVisible"
        round
      >{{ activeTagName }}</el-button>
    </template>
    <el-scrollbar class="scrollbar">
      <el-button class="btns" round @click.stop="handleClickButton(0, '全部')">全部</el-button>
      <el-button class="btns" round @click.stop="handleClickButton(1, '推荐')">推荐</el-button>
      <hr class="divider" />
      <el-button
        class="btns"
        v-for="(tag) in tags"
        :key="tag.id"
        @click.stop="handleClickButton(tag.id, tag.name)"
        round
      >
        {{ tag.name }}
      </el-button>
    </el-scrollbar>
  </el-popover>
  <div
    class="videos-main-wrap"
    v-infinite-scroll="loadVideos"
    :infinite-scroll-disabled="isDisableScroll"
  >
    <VideoItem
      v-for="(video) in videos"
      :key="video.vid"
      type="video"
      :video="video"
    />
    <RoundSpinner class="loading-animation" v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import {
  getVideoGroupList,
  getAllVideos,
  getRecommendVideos,
  getVideosByGroupId,
} from '@/api/video'
import VideoItem from '@/components/video/VideoItem.vue'
import RoundSpinner from '@/components/loading/RoundSpinner.vue'
import { VideoBrief, VideoTag } from '@/assets/types/video'

const activeTagName = ref('全部')
const activeTagId = ref(0)
const tags = ref<VideoTag[]>([])
const videos = ref<VideoBrief[]>([])
const popperVisible = ref(false)
const offset = ref(0)
const isLoading = ref(false)
const isDisableScroll = ref(false)

const getData = async () => {
  const { data } = await getVideoGroupList()
  tags.value = data.data
}

onBeforeMount(() => {
  getData()
})

const handleClickButton = (id: number, name: string) => {
  popperVisible.value = false
  activeTagName.value = name
  activeTagId.value = id
}

window.addEventListener('click', (event: MouseEvent) => {
  const isClickPopper = document.querySelector('.video-tags-popper')?.contains(event.target as any)
  if (isClickPopper) {
    popperVisible.value = true
  } else {
    popperVisible.value = false
  }
})

const loadVideos = async () => {
  isDisableScroll.value = true
  isLoading.value = true
  let data
  if (activeTagId.value === 0) {
    data = await getAllVideos({ offset: offset.value })
  } else if (activeTagId.value === 1) {
    data = await getRecommendVideos({ offset: offset.value })
  } else {
    data = await getVideosByGroupId({ id: activeTagId.value, offset: offset.value })
  }
  videos.value.push(...data.data.datas.map((item: { data: VideoBrief }) => item.data))
  offset.value += 1
  isLoading.value = false
  isDisableScroll.value = false
}

watch(activeTagId, () => {
  offset.value = 0
  videos.value = []
  loadVideos()
}, { immediate: true })
</script>

<style scoped lang="scss">
.videos-main-wrap {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .loading-animation {
    font-size: 3px;
    padding: 10px 0;
  }
}
.scrollbar {
  .divider {
    margin: 10px;
    border-color: rgb(105, 99, 99);
  }
}
.btns {
  width: 104px;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 12px;
}
</style>
