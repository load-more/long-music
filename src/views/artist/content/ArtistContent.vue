<template>
  <div class="artist-content-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="单曲" name="song">
        <ArtistSong :hot-songs="hotSongs" />
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        <ArtistAlbum :id="id" />
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <ArtistMv :id="id" />
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="desc">
        <ArtistDescription :id="id" />
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="similar">
        <ArtistSimilar :id="id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
} from 'vue'
import { songType } from '@/assets/ts/type'
import ArtistSong from './ArtistSong.vue'
import ArtistAlbum from './ArtistAlbum.vue'
import ArtistDescription from './ArtistDescription.vue'
import ArtistMv from './ArtistMv.vue'
import ArtistSimilar from './ArtistSimilar.vue'

defineProps<{
  id: number
  hotSongs: songType[]
}>()

const activeTab = ref('song')

</script>

<style scoped lang="scss">
.artist-content-wrap {
  color: $font-color;
  :deep .el-tabs__header {
    margin: 0;
  }
  :deep .el-tabs__content {
    margin-top: 10px;
  }
}
</style>
