<template>
  <el-menu
    class="el-menu"
    default-active="home"
    router
  >
    <el-scrollbar class="scroll-bar">
      <el-menu-item
        index="home"
        :route="{ name: 'home' }"
      >
        <span>首页</span>
      </el-menu-item>
      <el-menu-item
        index="videos"
        :route="{ name: 'videos' }"
      >
        <span>视频</span>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <span>关注</span>
      </el-menu-item>
      <el-menu-item-group title="我的音乐">
        <el-menu-item index="8" disabled>
          <i class="iconfont icon-latest"></i>&nbsp;
          <span>最近播放</span>
        </el-menu-item>
        <el-menu-item index="9" disabled>
          <i class="iconfont icon-cloud"></i>&nbsp;
          <span>音乐云盘</span>
        </el-menu-item>
        <el-menu-item index="11" disabled>
          <i class="iconfont icon-collection"></i>&nbsp;
          <span>我的收藏</span>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="我的歌单">
        <el-sub-menu index="created-playlist">
          <template #title>
            <span>创建的歌单</span>
          </template>
          <el-menu-item
            v-for="(item) in createdPlaylist"
            :key="item.id"
            :index="item.id"
            :route="{ name: 'playlist', params: { id: item.id } }"
          >
            <div class="cover-wrap">
              <el-image
                class="cover-img"
                :src="item.coverImg"
              ></el-image>
            </div>
            <span class="single-line-ellipsis" :title="item.title">
              {{ item.title }}
            </span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="starred-playlist">
          <template #title>
            <span>收藏的歌单</span>
          </template>
          <el-menu-item
            v-for="(item) in starredPlaylist"
            :key="item.id"
            :index="item.id"
            :route="{ name: 'playlist', params: { id: item.id } }"
          >
            <div class="cover-wrap">
              <el-image
                class="cover-img"
                :src="item.coverImg"
              ></el-image>
            </div>
            <span class="single-line-ellipsis" :title="item.title">
              {{ item.title }}
            </span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu-item-group>
    </el-scrollbar>
  </el-menu>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { getUserPlaylist } from '@/api/user'
import { sidebarPlaylistType } from '@/assets/ts/type'

const { userDetail } = storeToRefs(useUserStore())

const createdPlaylist = reactive<sidebarPlaylistType[]>([])
const starredPlaylist = reactive<sidebarPlaylistType[]>([])
const getData = async () => {
  const { data } = await getUserPlaylist({ uid: userDetail.value.userId })
  data.playlist.forEach((item: any) => {
    const obj: sidebarPlaylistType = {
      id: item.id,
      coverImg: item.coverImgUrl,
      title: item.name,
    }
    if (item.creator.userId === userDetail.value.userId) {
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
$sideWidth: 200px;
$menuItemHeight: 44px;
.el-menu {
  width: $sideWidth;
  height: 100%;
  border: none;
  background-color: $sidebar-bg-color;
  .el-menu-item {
    height: $menuItemHeight;
    border-radius: 5px;
    padding-left: 10px!important;
    padding-right: 0!important;
    margin: 0 20px;
    line-height: unset;
    min-width: unset;
  }
  .el-menu-item.is-disabled {
    cursor: default;
  }
  .el-menu-item.is-active {
    background-color: rgba(#000, 0.1);
  }
  :deep .el-sub-menu__title {
    height: 44px;
    background-color: unset;
    line-height: 44px;
  }
  :deep .el-menu--inline {
    background-color: transparent;
  }
  .cover-wrap {
    height: 44px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    .cover-img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
    }
  }
}
</style>
