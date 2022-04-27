<template>
  <div>
    <div>
      <el-button
        round
        @click="router.push({ name: 'allVideos', query: { a: 1, o: 2 } })"
      >
        最新<i class="iconfont icon-right-arrow"></i>
      </el-button>
      <div class="newest-mvs">
        <VideoItem
          v-for="(video) in newestMvs"
          :key="video.id"
          type="mv"
          :video="video"
        />
      </div>
    </div>
    <div>
      <el-button
        round
        @click="router.push({ name: 'allVideos', query: { o: 2 } })"
      >
        热播<i class="iconfont icon-right-arrow"></i>
      </el-button>
      <div class="hot-mvs">
        <VideoItem
          v-for="(video) in hotMvs"
          :key="video.id"
          type="mv"
          :video="video"
        />
      </div>
    </div>
    <div>
      <el-button
        round
        @click="router.push({ name: 'allVideos', query: { t: 4, o: 2 } })"
      >
        独家<i class="iconfont icon-right-arrow"></i>
      </el-button>
      <div class="exclusive-mvs">
        <VideoItem
          v-for="(video) in exclusiveMvs"
          :key="video.id"
          type="mv"
          :video="video"
        />
      </div>
    </div>
    <div>
      <el-button round>
        排行榜<i class="iconfont icon-right-arrow"></i>
      </el-button>
      <div class="top-mvs">
        <VideoItem
          v-for="(video) in topMvs"
          :key="video.id"
          type="mv"
          :video="video"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import {
  getNewestMvs,
  getAllMvs,
  getExclusiveMvs,
  getTopMvs,
} from '@/api/video'
import { briefMvType } from '@/assets/ts/type'
import { resolveBriefMvs } from '@/utils/resolve'
import VideoItem from '@/components/video/VideoItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const newestMvs = ref<briefMvType[]>([])
const hotMvs = ref<briefMvType[]>([])
const exclusiveMvs = ref<briefMvType[]>([])
const topMvs = ref<briefMvType[]>([])

const getData = async () => {
  const { data: newestData } = await getNewestMvs({
    limit: 8,
  })
  newestMvs.value = resolveBriefMvs(newestData.data)

  const { data: hotData } = await getAllMvs({
    order: '最热',
    limit: 8,
  })
  hotMvs.value = resolveBriefMvs(hotData.data)

  const { data: exclusiveData } = await getExclusiveMvs({
    limit: 8,
  })
  exclusiveMvs.value = resolveBriefMvs(exclusiveData.data)

  const { data: topData } = await getTopMvs({
    limit: 10,
  })
  topMvs.value = resolveBriefMvs(topData.data)
}

onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.newest-mvs, .hot-mvs, .exclusive-mvs, .top-mvs {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
