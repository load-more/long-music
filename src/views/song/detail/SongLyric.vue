<template>
  <el-scrollbar class="lyric-scrollbar" ref="scrollbarRef">
    <div class="placeholder"></div>
    <div
      class="lyric-item"
      v-for="([key, value]) in lyricMap"
      :key="key"
      :data-key="key"
      :ref="setItemRef"
    >
      <span class="raw" >
        {{ value }}
      </span>
    </div>
    <div class="placeholder"></div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { getMusicLyric } from '@/api/music'
import type { ElScrollbar } from 'element-plus'
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
import { formatLyricTime } from '@/utils/format'

const props = defineProps<{
  id: number
}>()

const { currentTime } = storeToRefs(useMusicStore())

const lyricMap = ref(new Map())
const lyricOffsetTopMap = ref(new Map())
const lyricRefMap = ref(new Map())
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const getData = async () => {
  const { data } = await getMusicLyric({ id: props.id })
  // 处理歌词
  // eslint-disable-next-line no-useless-escape
  const kArr = data.lrc.lyric.match(/\[[\d+:\d+\.\d+]*\]/g)
  // eslint-disable-next-line no-useless-escape
  const vArr = data.lrc.lyric.split(/\[[\d+:\d+\.\d+]*\]/g).slice(1)
  kArr.forEach((item: string, index: number) => {
    const key = formatLyricTime(item.slice(1, item.length - 1))
    lyricMap.value.set(key, vArr[index])
    lyricOffsetTopMap.value.set(key, index * 36)
  })
}

const setItemRef = (el: any) => {
  if (el) {
    lyricRefMap.value.set(Number(el.getAttribute('data-key')), el)
  }
}

const changeCurrentLyric = (key: number) => {
  scrollbarRef.value?.setScrollTop(lyricOffsetTopMap.value.get(key))
  if (lyricRefMap.value.get(key)) {
    lyricRefMap.value.forEach((item) => {
      item.classList.remove('active')
    })
    lyricRefMap.value.get(key).classList.add('active')
  }
}

const currentTimeCache = ref(currentTime.value)
watch(currentTime, () => {
  const arr = [...lyricMap.value.keys()]
  const delta = -0.5 // 时间偏差，使歌词提前或延迟显示
  const newTime = arr.find((item, index) => currentTime.value >= item + delta
    && currentTime.value < arr[index + 1] + delta)
    || (currentTime.value >= arr[arr.length - 1] + delta ? arr[arr.length - 1] : arr[0])
  if (newTime !== currentTimeCache.value) {
    changeCurrentLyric(newTime)
    currentTimeCache.value = newTime
  }
})

onBeforeMount(async () => {
  await getData()
})
</script>

<style scoped lang="scss">
.lyric-scrollbar {
  height: 250px;
  .lyric-item {
    text-align: center;
    height: 36px;
    line-height: 36px;
    transition: all 0.1s ease-in-out;
  }
  .active {
    color: $theme-color-1;
    font-size: 16px;
  }
  .placeholder {
    height: 107px;
  }
}
</style>
