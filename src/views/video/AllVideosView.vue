<template>
  <div class="all-videos-container">
    <el-scrollbar class="scrollbar">
      <div class="all-videos" v-show="!isLoading">
        <span class="label">全部MV</span>
        <div class="selector">
          <div class="item">
            <span>地区：</span>
            <span
              class="content"
              v-for="(item, index) in areaLabel"
              :key="item"
              :class="{ active: index === activeArea }"
              @click="activeArea = index"
            >{{ item }}</span>
          </div>
          <div class="item">
            <span>类型：</span>
            <span
              class="content"
              v-for="(item, index) in typeLabel"
              :key="item"
              :class="{ active: index === activeType }"
              @click="activeType = index"
            >{{ item }}</span>
          </div>
          <div class="item">
            <span>排序：</span>
            <span
              class="content"
              v-for="(item, index) in orderLabel"
              :key="item"
              :class="{ active: index === activeOrder }"
              @click="activeOrder = index"
            >{{ item }}</span>
          </div>
        </div>
        <MyPagination
          :page-size="pageSize"
          :total="count"
          :page-data="pageData"
          @get-page="getPage"
          #default="{ currentPage, pageMap }"
        >
          <div class="videos">
            <VideoItem
              v-for="(video) in pageMap.get(currentPage - 1)"
              :key="video.id"
              type="mv"
              :video="video"
            />
          </div>
        </MyPagination>
      </div>
      <WaveSpinner v-if="isLoading" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { resolveBriefMvs } from '@/utils/resolve'
import { getAllMvs } from '@/api/video'
import { useRoute, useRouter } from 'vue-router'
import VideoItem from '@/components/video/VideoItem.vue'
import MyPagination from '@/components/pagination/MyPagination.vue'
import WaveSpinner from '@/components/loading/WaveSpinner.vue'

const route = useRoute()
const router = useRouter()
const areaLabel = ['全部', '内地', '港台', '欧美', '韩国', '日本']
const typeLabel = ['全部', '官方版', '原声', '现场版', '网易出品']
const orderLabel = ['上升最快', '最热', '最新']
const activeArea = ref(Number(route.query.a) || 0)
const activeType = ref(Number(route.query.t) || 0)
const activeOrder = ref(Number(route.query.o) || 0)
const pageSize = ref(32)
const count = ref(0)
const pageData = ref()
const isLoading = ref(false)

const getPage = async (offset: number) => {
  isLoading.value = true
  const { data } = await getAllMvs({
    area: areaLabel[activeArea.value] as any,
    type: typeLabel[activeType.value] as any,
    order: orderLabel[activeOrder.value] as any,
    limit: 20,
    offset: pageSize.value * offset,
  })
  pageData.value = resolveBriefMvs(data.data)
  count.value = data.count
  isLoading.value = false
}

onBeforeMount(async () => {
  await getPage(0)
})

watch([activeArea, activeType, activeOrder], () => {
  router.push({ name: 'allVideos', query: { a: activeArea.value, t: activeType.value, o: activeOrder.value } })
})
</script>

<style scoped lang="scss">
.all-videos-container {
  color: $font-color;
  height: 100%;
  .scrollbar, :deep .el-scrollbar__view {
    height: 100%;
  }
  .all-videos {
    padding: 20px;
    .label {
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 20px;
    }
    .selector {
      font-size: 14px;
      .item {
        margin-bottom: 5px;
      }
      .content {
        display: inline-block;
        width: 80px;
        text-align: center;
        color: $font-inactive-color;
        cursor: pointer;
        &:hover {
          color: $font-color;
        }
      }
      .content.active {
        color: $font-color;
      }
    }
    .videos {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
    }
  }
}
</style>
