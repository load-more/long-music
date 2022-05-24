<template>
  <div class="playlist-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="创建的歌单" name="created">
        <PlaylistItem
          v-for="item in createdPlaylist"
          :key="item.id"
          :info="item"
          @click="router.push({ name: 'playlist', params: { id: item.id } })"
        />
      </el-tab-pane>
      <el-tab-pane label="收藏的歌单" name="starred">
        <PlaylistItem
          v-for="item in starredPlaylist"
          :key="item.id"
          :info="item"
          @click="router.push({ name: 'playlist', params: { id: item.id } })"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getUserPlaylist } from '@/api/user'
import { useRouter } from 'vue-router'
import { PlaylistDetail } from '@/assets/types/playlist'
import PlaylistItem from '@/components/playlist/PlaylistItem.vue'

const props = defineProps<{
  uid: number
}>()
const emit = defineEmits(['finish-loading'])

const router = useRouter()

const createdPlaylist = ref<PlaylistDetail[]>([])
const starredPlaylist = ref<PlaylistDetail[]>([])
const activeTab = ref('created')

const getData = async () => {
  // 获取用户歌单信息
  const { data: playlistData } = await getUserPlaylist({ uid: props.uid })
  playlistData.playlist.forEach((item: PlaylistDetail) => {
    if (item.creator.userId === props.uid) {
      // 如果是用户创建的歌单
      createdPlaylist.value.push(item)
    } else {
      // 如果是用户收藏的歌单
      starredPlaylist.value.push(item)
    }
  })
  // 数据加载完成
  emit('finish-loading')
}
onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.playlist-wrap {
  padding-top: 20px;
}
</style>
