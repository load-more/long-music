<template>
  <div class="search-recommend-item-wrap" @click="handleClickItem">
    <el-image :src="`${imgSrc}?param=50y50`" class="image" fit="cover"></el-image>
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
import { formatCount } from '@/utils/format'
import type { SearchMultiMatch } from '@/assets/types/search'
import { useRouter } from 'vue-router'

const props = defineProps<{
  type: 'artist' | 'playlist' | 'album'
  data: SearchMultiMatch
}>()

const router = useRouter()

const imgSrc = computed(() => {
  if (props.type === 'playlist') return props.data.playlist![0].coverImgUrl
  if (props.type === 'artist') return props.data.artist![0].picUrl
  if (props.type === 'album') return props.data.album![0].picUrl
  return ''
})
const title = computed(() => {
  if (props.type === 'artist') {
    if (props.data.artist![0].alias.length) {
      return `歌手：${props.data.artist![0].name}（${props.data.artist![0].alias.join('/')}）`
    }
    return `歌手：${props.data.artist![0].name}`
  }
  if (props.type === 'playlist') return `歌单：${props.data.playlist![0].name}`
  if (props.type === 'album') return `专辑：${props.data.album![0].name}`
  return ''
})
const desc = computed(() => {
  if (props.type === 'artist') {
    return `粉丝：${formatCount(props.data.artist![0].fansSize || 0)} 歌曲：
    ${props.data.artist![0].musicSize}`
  }
  if (props.type === 'playlist') {
    return `歌曲：${props.data.playlist![0].trackCount} 播放：
    ${formatCount(props.data.playlist![0].playCount)}`
  }
  if (props.type === 'album') {
    return `${props.data.album![0].artist.name}`
  }
  return ''
})

const handleClickItem = () => {
  router.push({ name: props.type, params: { id: props.data[props.type]![0].id } })
}
</script>

<style scoped lang="scss">
.search-recommend-item-wrap {
  flex: 1;
  overflow: hidden;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: $item-color-1;
  display: flex;
  align-items: center;
  cursor: pointer;
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
    color: $font-color;
    .title {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .desc {
      font-size: 12px;
    }
  }
}
</style>
