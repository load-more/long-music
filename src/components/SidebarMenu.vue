<template>
  <el-menu
    active-text-color="gray"
    background-color="#000"
    class="el-menu"
    default-active="2"
    text-color="#fff"
  >
    <el-scrollbar height="600px">
      <el-menu-item>
        <span>发现音乐</span>
      </el-menu-item>
      <el-menu-item>
        <span>播客</span>
      </el-menu-item>
      <el-menu-item>
        <span>视频</span>
      </el-menu-item>
      <el-menu-item>
        <span>关注</span>
      </el-menu-item>
      <el-menu-item>
        <span>直播</span>
      </el-menu-item>
      <el-menu-item>
        <span>私人FM</span>
      </el-menu-item>
      <el-menu-item disabled>
        <span>我的音乐</span>
      </el-menu-item>
      <el-menu-item>
        <i class="iconfont icon-download"></i>&nbsp;
        <span>本地下载</span>
      </el-menu-item>
      <el-menu-item>
        <i class="iconfont icon-latest"></i>&nbsp;
        <span>最近播放</span>
      </el-menu-item>
      <el-menu-item>
        <i class="iconfont icon-cloud"></i>&nbsp;
        <span>音乐云盘</span>
      </el-menu-item>
      <el-menu-item>
        <i class="iconfont icon-Channel"></i>&nbsp;
        <span>我的播客</span>
      </el-menu-item>
      <el-menu-item>
        <i class="iconfont icon-collection"></i>&nbsp;
        <span>我的收藏</span>
      </el-menu-item>
      <el-menu-item>
        <span>创建的歌单</span>&nbsp;
        <i class="iconfont icon-right-arrow1"></i>
        <i class="iconfont icon-add"></i>
      </el-menu-item>
      <el-menu-item>
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
.el-menu {
  width: 200px;
  border: none;
  .el-menu-item {
    height: 44px;
    padding-left: 5px !important;
    &:hover {
      background-color: #333;
    }
    &:nth-last-child(1), &:nth-last-child(2) {
      font-size: 12px;
      color: gray;
      i {
        font-size: 12px;
      }
      .icon-add {
        font-size: 18px;
        margin-left: 80px;
      }
      &:hover {
        background-color: transparent;
        color: rgb(158, 158, 158);
      }
    }
  }
  .el-menu-item.is-disabled {
    cursor: default;
  }
}
</style>
