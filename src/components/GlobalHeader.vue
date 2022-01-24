<template>
  <el-row class="container">
    <el-col :span="4" class="left">
      <a href="/#">
        <img src="@/assets/logo.png" alt="logo">
      </a>
    </el-col>
    <el-col :span="6" class="mid">
      <a href="/#">
        <i class="iconfont icon-left-arrow"></i>
      </a>
      <a href="/#">
        <i class="iconfont icon-right-arrow"></i>
      </a>
      <el-input
        class="w-50 m-2"
        placeholder="Pick a date"
      >
        <template #prefix>
          <a href="/#">
            <i class="iconfont icon-search"></i>
          </a>
        </template>
      </el-input>
      <a href="/#">
        <i class="iconfont icon-microphone"></i>
      </a>
    </el-col>
    <el-col :span="6" class="right">
      <div class="user-info">
        <el-avatar
          :size="40"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            nickname
            <i class="iconfont icon-drop-down-arrow"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <a href="/#">
        <i class="iconfont icon-Message"></i>
      </a>
      <a href="/#">
        <i class="iconfont icon-theme"></i>
      </a>
      <a href="/#">
        <i class="iconfont icon-setting"></i>
      </a>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.container {
  height: 70px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      img {
        height: 70%;
      }
    }
  }
  .mid {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-input {
      width: 200px;
    }
    .icon-left-arrow, .icon-right-arrow, .icon-microphone {
      color: #fff;
    }
    .icon-microphone {
      font-size: 24px;
    }
    .icon-search {
      color: #000;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 130px;
      i {
        color: gray;
        font-size: 12px;
      }
    }
    i {
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
