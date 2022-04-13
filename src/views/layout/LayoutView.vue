<template>
  <div id="layout-container">
    <div id="header-container">
      <TheHeader />
    </div>
    <div id="content-container">
      <!-- 圣杯布局【将主要内容放在前面，使之相较于侧边栏更快渲染出来】 -->
      <div id="main-container">
        <!-- 加载 key，在同一个路由改变参数跳转时就不会利用之前的路由而导致页面不刷新的问题 -->
        <router-view :key="$route.fullPath" />
      </div>
      <div id="sidebar-container" class="hidden-xs-only">
        <TheSidebar />
      </div>
    </div>
    <div id="footer-container">
      <TheFooter v-if="isShowFooter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/utils/emitter'
import { ref, nextTick } from 'vue'
import TheHeader from './header/TheHeader.vue'
import TheSidebar from './sidebar/TheSidebar.vue'
import TheFooter from './footer/TheFooter.vue'

const isShowFooter = ref(true)
emitter.on('onRemoveCurrentSong', () => {
  // 重新加载 footer 组件
  isShowFooter.value = false
  nextTick(() => {
    isShowFooter.value = true
  })
})
</script>

<style scoped lang="scss">
$headerHeight: 70px;
$footerHeight: 80px;
$sideWidth: 200px;
#layout-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  #header-container {
    width: 100%;
    height: $headerHeight;
    position: absolute;
    top: 0;
  }
  #footer-container {
    width: 100%;
    height: $footerHeight;
    position: absolute;
    bottom: 0;
  }
  #content-container {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding-left: $sideWidth;
    position: absolute;
    top: $headerHeight;
    bottom: $footerHeight;
    #main-container, #sidebar-container {
      float: left;
      height: 100%;
    }
    #main-container {
      width: 100%;
      height: 100%;
      background-color: $main-bg-color;
    }
    #sidebar-container {
      width: $sideWidth;
      margin-left: -100%;
      position: relative;
      left: -$sideWidth;
    }
    @media screen and (max-width: 768px) {
      padding-left: 0;
    }
  }
}
</style>
