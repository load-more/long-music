<template>
  <el-row class="container" align="middle" justify="space-between">
    <el-col :span="8" class="left">
      <div class="song-image">
        <el-avatar
          shape="square" :size="60"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
      <div class="song-info">
        <div class="title">
          <span>song-title</span>
          <i class="iconfont icon-like"></i>
        </div>
        <div class="author">
          <span>song-author</span>
        </div>
      </div>
    </el-col>
    <el-col :span="8" class="mid">
      <div class="play-controls">
        <a href="/#"><i class="iconfont icon-order-play"></i></a>
        <a href="/#"><i class="iconfont icon-previous"></i></a>
        <a href="/#"><i class="iconfont icon-pause"></i></a>
        <a href="/#"><i class="iconfont icon-next"></i></a>
        <a href="/#"><i class="iconfont icon-lyrics"></i></a>
      </div>
      <div class="progress-bar">
        <el-progress :percentage="50" />
      </div>
    </el-col>
    <el-col :span="8" class="right">
      <a href="/#"><i class="iconfont icon-volume"></i></a>
      <a href="/#"><i class="iconfont icon-list"></i></a>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.container {
  height: 80px;
  background-color: #000;
  color: #fff;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    .song-image {
      height: 60px;
      margin: 0 10px;
    }
    .song-info {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .title {
        font-size: 20px;
        .icon-like {
          margin-left: 5px;
        }
      }
      .author {
        font-size: 14px;
      }
    }
  }
  .mid {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .play-controls {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      i {
        font-size: 16px;
        color: #fff;
      }
      .icon-pause {
        font-size: 22px;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    i {
      font-size: 16px;
      color: #fff;
    }
    a {
      margin-right: 20px;
    }
  }
}
</style>
