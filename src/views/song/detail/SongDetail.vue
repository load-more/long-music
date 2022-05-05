<template>
  <div class="song-detail-wrap">
    <div class="info">
      <div class="title single-line-ellipsis">
        <span>
          {{ song?.name }}
        </span>
      </div>
      <div class="alias single-line-ellipsis" v-if="song?.alias.length || song?.tns.length">
        <span v-if="song?.alias.length">
          <span
            v-for="(item, index) in song.alias"
            :key="index"
          >
            {{ item }}<span class="separator" v-if="index !== song.alias.length - 1">|</span>
          </span>
        </span>
        <span v-if="song.tns.length">
          <span
            v-for="(item, index) in song.tns"
            :key="index"
          >
            {{ item }}<span class="separator" v-if="index !== song.tns.length - 1">|</span>
          </span>
        </span>
      </div>
      <div class="bottom-wrap">
        <div class="artist">
          <i class="iconfont icon-artist"></i>
          <span
            v-for="(item, index) in song?.artists"
            :key="index"
          >
            <span
              class="name"
              :title="item.name"
              @click="router.push({ name: 'artist', params: { id: item.id } })"
            >
              {{ item.name }}
            </span>
            <span class="separator" v-if="index !== song!.artists.length - 1">|</span>
          </span>
        </div>
        <div class="album">
          <span>
            <i class="iconfont icon-album"></i>
            <span
              class="name"
              :title="song?.album.name"
              @click="router.push({ name: 'album', params: { id: song?.album.id } })"
            >{{ song?.album.name }}</span>
          </span>
          <span v-if="song?.album.tns.length">
            <span>（</span>
            <span
              v-for="(item, index) in song.album.tns"
              :key="index"
            >
              <span>{{ item }}</span>
              <span class="separator" v-if="index !== song.album.tns.length - 1">|</span>
            </span>
            <span>）</span>
          </span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="cover-wrap">
        <el-image
          class="cover-img"
          :src="song?.album.picUrl"
        ></el-image>
      </div>
      <div class="lyric-wrap">
        <SongLyric :id="id" class="lyric" />
      </div>
      <div class="recommend-wrap"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getMusicDetail } from '@/api/music'
import { songType } from '@/assets/ts/type'
import { resolveSongsDetail } from '@/utils/resolve'
import { useRouter } from 'vue-router'
import SongLyric from './SongLyric.vue'

const props = defineProps<{
  id: number
}>()
const emit = defineEmits(['finishLoading'])

const song = ref<songType>()
const router = useRouter()

const getData = async () => {
  const { data } = await getMusicDetail({ ids: props.id })
  const rst = resolveSongsDetail(data)[0]
  song.value = rst
  emit('finishLoading')
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.song-detail-wrap {
  width: 100%;
  color: $font-color;
  font-size: 14px;
  .main {
    padding-top: 20px;
    position: relative;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cover-wrap {
      width: 20%;
      .cover-img {
        flex-shrink: 0;
        border-radius: 10px;
      }
    }
    .lyric-wrap {
      width: 60%;
    }
    .recommend-wrap {
      width: 20%;
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
    .alias {
      color: $font-deep-color;
    }
    .bottom-wrap {
      margin-top: 10px;
      @include flex-center;
      .artist {
        padding-right: 15px;
      }
      i {
        margin-right: 5px;
      }
    }
    .name {
      cursor: pointer;
      @include hover-font;
    }
    .separator {
      padding: 0 5px;
    }
  }
}
</style>
