<template>
  <div class="sidebar-wrap" ref="sidebar">
    <div class="icons-wrap">
      <div class="icon-double-left-arrow-wrap">
        <i
          class="iconfont icon-double-left-arrow"
          @click="toggleMenuState(1)"
        ></i>
      </div>
      <div class="icon-wrap">
        <i
          class="iconfont icon-home"
          @click="router.push({ name: 'home' })"
        ></i>
      </div>
      <div class="icon-wrap">
        <i
          class="iconfont icon-video"
          @click="router.push({ name: 'videos' })"
        ></i>
      </div>
    </div>
    <el-menu
      class="el-menu"
      id="sidebar-menu"
      default-active="home"
      router
    >
      <el-scrollbar class="scroll-bar">
        <div class="shrink-icon">
          <i
            class="iconfont icon-double-right-arrow"
            @click="toggleMenuState(0)"
          ></i>
        </div>
        <el-menu-item
          index="home"
          :route="{ name: 'home' }"
        >
          <span class="menu-item-label">首页</span>
        </el-menu-item>
        <el-menu-item
          index="videos"
          :route="{ name: 'videos' }"
        >
          <span class="menu-item-label">视频</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <span class="menu-item-label">关注</span>
        </el-menu-item>
        <el-menu-item-group title="我的音乐">
          <el-menu-item index="8" disabled>
            <span class="menu-item-label">
              <i class="iconfont icon-latest"></i>&nbsp;最近播放
            </span>
          </el-menu-item>
          <el-menu-item index="9" disabled>
            <span class="menu-item-label">
              <i class="iconfont icon-cloud"></i>&nbsp;音乐云盘
            </span>
          </el-menu-item>
          <el-menu-item index="11" disabled>
            <span class="menu-item-label">
              <i class="iconfont icon-collection"></i>&nbsp;我的收藏
            </span>
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
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  reactive,
  ref,
} from 'vue'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { getUserPlaylist } from '@/api/user'
import { sidebarPlaylistType } from '@/assets/ts/type'
import { useRouter } from 'vue-router'

const { userDetail, isSidebarExpand } = storeToRefs(useUserStore())
const router = useRouter()
const sidebar = ref<HTMLElement>()
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

const toggleMenuState = (state: 0 | 1) => {
  const menu = document.getElementById('sidebar-menu')
  sidebar.value!.classList.remove('is-expand')
  sidebar.value!.classList.remove('is-shrink')
  if (state === 1) { // 展开 menu
    menu!.style.width = '200px'
    menu!.style.visibility = 'visible'
    menu!.style.backgroundColor = 'rgba(0,0,0,0.5)'
    sidebar.value!.classList.add('is-expand')
  } else { // 收缩 menu
    menu!.style.width = '20px'
    menu!.style.visibility = 'hidden'
    menu!.style.backgroundColor = 'transparent'
    sidebar.value!.classList.add('is-shrink')
  }
  isSidebarExpand.value = !!state
}
</script>

<style scoped lang="scss">
$sideWidth: 200px;
$menuItemHeight: 44px;
.sidebar-wrap {
  color: $font-color;
  height: 100%;
  position: relative;
  &.is-shrink {
    .icons-wrap {
      .iconfont {
        @include bounce-in;
        animation-delay: 0.5s;
      }
    }
    .shrink-icon {
      .iconfont {
        @include bounce-out;
      }
    }
  }
  &.is-expand {
    .icons-wrap {
      .iconfont {
        @include bounce-out;
      }
    }
    .shrink-icon {
      .iconfont {
        @include bounce-in;
        animation-delay: 0.5s;
      }
    }
  }
  .icons-wrap {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    z-index: 0;
    .icon-wrap {
      height: 44px;
      @include flex-center;
      .iconfont {
        display: inline-block;
        height: 16px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .icon-double-left-arrow-wrap {
      height: 30px;
      @include flex-center;
      .iconfont {
        display: inline-block;
        font-size: 12px;
        height: 12px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  .el-menu {
    visibility: hidden;
    width: 20px;
    height: 100%;
    border: none;
    border-radius: 10px;
    margin: 0 10px;
    background-color: transparent;
    transition: all .25s ease-in .25s;
    z-index: 1;
    .shrink-icon {
      margin-right: 20px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .iconfont {
        font-size: 12px;
        cursor: pointer;
        position: relative;
        display: inline-block;
        height: 13px;
        transition: all 0.1s ease-in-out;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    &:hover {
      .shrink-icon {
        .iconfont {
          @include bounce-in;
        }
      }
    }
    &:not(:hover) {
      .shrink-icon {
        .iconfont {
          @include bounce-out;
        }
      }
    }
    .el-menu-item {
      height: $menuItemHeight;
      border-radius: 5px;
      padding-left: 0!important;
      padding-right: 0!important;
      margin: 0 10px;
      line-height: unset;
      min-width: unset;
      .menu-item-label {
        width: 100%;
        display: flex;
        justify-content: center;
      }
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
}
</style>
