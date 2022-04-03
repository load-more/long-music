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
      <el-menu-item index="2">
        <span>播客</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span>视频</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>关注</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span>直播</span>
      </el-menu-item>
      <el-menu-item index="6">
        <span>私人FM</span>
      </el-menu-item>
      <el-menu-item-group title="我的音乐">
        <el-menu-item index="7">
          <i class="iconfont icon-download"></i>&nbsp;
          <span>本地下载</span>
        </el-menu-item>
        <el-menu-item index="8">
          <i class="iconfont icon-latest"></i>&nbsp;
          <span>最近播放</span>
        </el-menu-item>
        <el-menu-item index="9">
          <i class="iconfont icon-cloud"></i>&nbsp;
          <span>音乐云盘</span>
        </el-menu-item>
        <el-menu-item index="10">
          <i class="iconfont icon-Channel"></i>&nbsp;
          <span>我的播客</span>
        </el-menu-item>
        <el-menu-item index="11">
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
            <span class="single-line-ellipsis">
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
            <span class="single-line-ellipsis">
              {{ item.title }}
            </span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu-item-group>
    </el-scrollbar>
  </el-menu>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'
import { getUserPlaylist } from '@/api/user'

const { userDetail } = storeToRefs(useMainStore())

interface playlistType {
  id: number
  coverImg: string
  title: string
}
const createdPlaylist = ref<playlistType[]>([])
const starredPlaylist = ref<playlistType[]>([])
const getData = async () => {
  const { data } = await getUserPlaylist({ uid: userDetail.value.uid })
  data.playlist.forEach((item: any) => {
    const obj: playlistType = {
      id: item.id,
      coverImg: item.coverImgUrl,
      title: item.name,
    }
    if (item.creator.userId === userDetail.value.uid) {
      // 如果是用户创建的歌单
      createdPlaylist.value.push(obj)
    } else {
      // 如果是用户收藏的歌单
      starredPlaylist.value.push(obj)
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
$menuItemPaddingLeft: 20px;
.el-menu {
  width: $sideWidth;
  height: 100%;
  border: none;
  background-color: $sidebar-bg-color;
  .scroll-bar {
    padding-left: 10px;
    padding-right: 20px;
    height: 100%;
  }
  .el-menu-item {
    height: $menuItemHeight;
    border-radius: 5px;
    padding-left: $menuItemPaddingLeft !important;
    line-height: unset;
  }
  .el-menu-item.is-disabled {
    cursor: default;
  }
  .el-menu-item.is-active {
    background-color: rgba(#000, 0.1);
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
