<template>
  <div class="playlist-wrap">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="创建的歌单" name="created">
        <UserPlaylistItem
          v-for="item in createdPlaylist"
          :key="item.id"
          :info="item"
          @click="router.push({ name: 'playlist', params: { id: item.id } })"
        />
      </el-tab-pane>
      <el-tab-pane label="收藏的歌单" name="starred">
        <UserPlaylistItem
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
import { onBeforeMount, ref, reactive } from 'vue'
import UserPlaylistItem, { infoType } from '@/components/profile/UserPlaylistItem.vue'
import { getUserPlaylist } from '@/api/user'
import { Decrypt } from '@/utils/secret'
import { useRouter } from 'vue-router'

const router = useRouter()

const createdPlaylist = reactive<infoType[]>([])
const starredPlaylist = reactive<infoType[]>([])
const activeTab = ref('created')

const getData = async () => {
  const uid = Decrypt(String(window.localStorage.getItem('uid')))
  // 获取用户歌单信息
  const { data: playlistData } = await getUserPlaylist({ uid })
  playlistData.playlist.forEach((item: any) => {
    const obj: infoType = {
      id: item.id,
      coverImg: item.coverImgUrl,
      title: item.name,
      songCount: item.trackCount,
      creator: item.creator.nickname,
      starCount: item.subscribedCount,
      playCount: item.playCount,
    }
    if (String(item.creator.userId) === uid) {
      // 如果是用户创建的歌单
      createdPlaylist.push(obj)
    } else {
      // 如果是用户收藏的歌单
      starredPlaylist.push(obj)
    }
  })
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
