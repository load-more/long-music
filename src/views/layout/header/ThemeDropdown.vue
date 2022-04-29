<template>
  <el-dropdown
    trigger="click"
    @command="handleCommand"
    popper-class="dropdown"
    class="theme-dropdown"
  >
    <i class="iconfont icon-theme"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, key) in themeDict"
          :key="item"
          :command="key"
        >
          <i
            class="iconfont icon-select"
            :style="{visibility: currentTheme === key ? 'unset' : 'hidden'}"
          ></i>
          <span>{{ item }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getThemeColor, setThemeColor } from '@/utils/storage'
import { switchTheme } from '@/utils/theme'

const themeDict = {
  green: '森',
  yellow: '焰',
  red: '枫',
  blue: '海',
  black: '夜',
  pink: '虹',
}
const currentTheme = ref(getThemeColor())
const handleCommand = (command: string) => {
  currentTheme.value = command
  // 写入 localStorage
  setThemeColor(command)
  // 切换主题颜色
  switchTheme(command)
}
</script>

<style scoped lang="scss">
.theme-dropdown {
  i {
    font-size: 18px;
    margin-right: 15px;
    display: inline-block;
    cursor: pointer;
    @include hover-font;
    &:hover {
      @include bounce-hover;
    }
  }
}
</style>
