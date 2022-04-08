<template>
  <el-scrollbar class="lyric-scrollbar">
    <div
      class="lyric-item"
      v-for="(item, index) in lyrics"
      :key="index"
    >
      {{ item }}
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getMusicLyric } from '@/api/music'

const props = defineProps<{
  id: number
}>()

const lyricMap = new Map()
const lyrics = ref<string[]>([])

const getData = async () => {
  const { data } = await getMusicLyric({ id: props.id })
  // 处理歌词
  // eslint-disable-next-line no-useless-escape
  const kArr = data.lrc.lyric.match(/\[[\d+:\d+\.\d+]*\]/g)
  // eslint-disable-next-line no-useless-escape
  const vArr = data.lrc.lyric.split(/\[[\d+:\d+\.\d+]*\]/g).slice(1)
  kArr.forEach((item: string, index: number) => {
    lyricMap.set(item, vArr[index])
    lyrics.value.push(vArr[index])
  })
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.lyric-scrollbar {
  padding-right: 20px;
  height: 250px;
  .lyric-item {
    text-align: center;
    padding: 10px 0;
  }
}
</style>
