<template>
  <el-menu
    class="el-menu"
    default-active="2"
  >
    <el-scrollbar class="scroll-bar">
      <el-menu-item index="1">
        <span>发现音乐</span>
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
      <el-menu-item disabled>
        <span>我的音乐</span>
      </el-menu-item>
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
      <el-menu-item index="12">
        <span>创建的歌单</span>&nbsp;
        <i class="iconfont icon-right-arrow1"></i>
        <i class="iconfont icon-add"></i>
      </el-menu-item>
      <el-menu-item index="13">
        <span>收藏的歌单</span>&nbsp;
        <i class="iconfont icon-right-arrow1"></i>
        <i class="iconfont icon-add"></i>
      </el-menu-item>
    </el-scrollbar>
  </el-menu>
</template>

<script setup lang="ts">

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
    &:nth-last-child(1), &:nth-last-child(2) {
      font-size: 12px;
      @include hover-font;
      i {
        font-size: 12px;
      }
      .icon-add {
        font-size: 18px;
        margin-left: 55px;
      }
      &:hover {
        background-color: transparent;
      }
    }
  }
  .el-menu-item.is-disabled {
    cursor: default;
  }
}
</style>
