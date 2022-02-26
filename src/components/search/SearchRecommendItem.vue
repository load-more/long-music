<template>
  <div class="search-recommend-item-wrap" v-if="info && imgSrc">
    <el-image :src="imgSrc" class="image" fit="cover"></el-image>
    <div class="right">
      <div class="title single-line-ellipsis">
        <span>{{ title }}</span>
      </div>
      <div class="desc single-line-ellipsis">
        <span>{{ desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatPlayCount } from '@/utils/format'
import { getLocalTime } from '@/utils/time'

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
const info: any = props.data ? props.data[0] : null
const imgSrc = computed(() => {
  // playlist
  if (props.category === 'playlist') return (info).coverImgUrl
  // artist / album
  if (props.category === 'artist' || props.category === 'album') return (info).picUrl
  // concert
  if (props.category === 'concert') return (info).cover
  return null
})
const title = computed(() => {
  if (props.category === 'artist') {
    if (info.alias.length) {
      return `歌手：${info.name}（${info.alias.join('/')}）`
    }
    return `歌手：${info.name}`
  }
  if (props.category === 'playlist') return `歌单：${info.name}`
  if (props.category === 'album') return `专辑：${info.name}`
  if (props.category === 'concert') return `演出：${info.title}`
  return null
})
const desc = computed(() => {
  if (props.category === 'artist') {
    return `粉丝：${formatPlayCount(info.fansSize)} 歌曲：${info.musicSize}`
  }
  if (props.category === 'playlist') {
    return `歌曲：${info.trackCount} 播放：${formatPlayCount(info.playCount)}`
  }
  if (props.category === 'album') {
    return `${info.artist.name}`
  }
  if (props.category === 'concert') {
    const start = getLocalTime(info.time[0])
    const end = getLocalTime(info.time[1])
    return `${start.month}月${start.date}日-${end.month}月${end.date}日
     ${info.simpleAddress.address}`
  }
  return null
})
</script>

<style scoped lang="scss">
.search-recommend-item-wrap {
  flex: 1;
  overflow: hidden;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  .image {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .right {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 14px;
      color: gray;
      margin-bottom: 5px;
    }
    .desc {
      font-size: 12px;
      color: gray;
    }
  }
}
</style>
