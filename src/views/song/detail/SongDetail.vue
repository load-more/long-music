<template>
  <div class="song-detail-wrap">
    <div class="info">
      <div class="title single-line-ellipsis">
        <span>
          {{ song?.name }}
        </span>
      </div>
      <div class="alias single-line-ellipsis" v-if="song?.alias.length || song?.tns?.length">
        <span v-if="song?.alias.length">
          <span
            v-for="(item, index) in song.alias"
            :key="index"
          >
            {{ item }}<span class="separator" v-if="index !== song.alias.length - 1">|</span>
          </span>
        </span>
        <span v-if="song?.tns?.length">
          <span
            v-for="(item, index) in song.tns"
            :key="index"
          >
            {{ item }}<span class="separator" v-if="index !== song.tns.length - 1">|</span>
          </span>
        </span>
      </div>
      <div class="artist single-line-ellipsis">
        <i class="iconfont icon-artist"></i>
        <span
          v-for="(item, index) in artists"
          :key="index"
        >
          <span class="name" :title="item.name">
            {{ item.name }}
          </span>
          <span class="separator" v-if="index !== artists!.length - 1">|</span>
        </span>
      </div>
      <div class="album single-line-ellipsis">
        <span>
          <i class="iconfont icon-album"></i>
          <span class="name" :title="album?.name">{{ album?.name }}</span>
        </span>
        <span v-if="album?.tns.length">
          <span>（</span>
          <span
            v-for="(item, index) in album.tns"
            :key="index"
          >
            <span>{{ item }}</span>
            <span class="separator" v-if="index !== album.tns.length - 1">|</span>
          </span>
          <span>）</span>
        </span>
      </div>
    </div>
    <div class="main">
      <el-image
        class="cover-img"
        :src="album?.picUrl"
      ></el-image>
      <SongLyric :id="id" class="lyric" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getMusicDetail } from '@/api/music'
import SongLyric from './SongLyric.vue'

const props = defineProps<{
  id: number
}>()
const emit = defineEmits(['finishLoading'])

interface songType {
  name: string
  id: number
  tns: string[]
  alias: string[]
}
interface artistType{
  id: number
  name: string
  tns: string[]
  alias: string[]
}
interface albumType {
  id: number
  name: string
  picUrl: string
  tns: string[]
}
const song = ref<songType>()
const artists = ref<artistType[]>()
const album = ref<albumType>()

const getData = async () => {
  const { data } = await getMusicDetail({ ids: props.id })
  song.value = {
    id: data.songs[0].id,
    name: data.songs[0].name,
    tns: data.songs[0].tns,
    alias: data.songs[0].alia,
  }
  artists.value = data.songs[0].ar
  album.value = data.songs[0].al
  emit('finishLoading')
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.song-detail-wrap {
  width: 100%;
  color: $font-inactive-color;
  font-size: 14px;
  .main {
    display: flex;
    padding-top: 20px;
    position: relative;
    .cover-img {
      width: 250px;
      height: 250px;
      flex-shrink: 0;
      border-radius: 10px;
    }
    .lyric {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 400px;
    }
  }
  .info {
    text-align: center;
    .title {
      color: $font-active-color;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .artist, .album {
      margin-top: 10px;
      display: inline-block;
      width: 40%;
    }
    .artist {
      text-align: end;
      padding-right: 15px;
      box-sizing: border-box;
    }
    .album {
      text-align: start;
    }
    i {
      margin-right: 5px;
    }
    .name {
      cursor: pointer;
    }
    .name:hover {
      color: $font-color;
    }
    .separator {
      padding: 0 5px;
    }
  }
}
</style>
