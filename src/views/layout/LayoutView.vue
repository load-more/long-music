<template>
  <div id="layout-container">
    <div id="header-container">
      <TheHeader />
    </div>
    <div id="content-container">
      <!-- 圣杯布局【将主要内容放在前面，使之相较于侧边栏更快渲染出来】 -->
      <div id="main-container">
        <!-- 加载 key，在同一个路由改变参数跳转时就不会利用之前的路由而导致页面不刷新的问题 -->
        <keep-alive>
          <router-view :key="$route.fullPath" />
        </keep-alive>
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
$headerHeight: 40px;
$footerHeight: 50px;
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
    z-index: 99;
  }
  #footer-container {
    width: 100%;
    height: $footerHeight;
    position: absolute;
    bottom: 0;
  }
  #content-container {
    width: 100%;
    position: absolute;
    top: $headerHeight;
    bottom: $footerHeight;
    display: flex;
    #main-container {
      flex: 1;
      margin-left: 10px;
      position: relative;
      z-index: 1;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(#fff, 0.2);
        border-radius: 10px;
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        background-image: url('/rainBg.png');
        background-position: center top;
        background-size: cover;
        background-attachment: fixed;
        -webkit-filter: blur(20px);
        -moz-filter: blur(20px);
        -ms-filter: blur(20px);
        -o-filter: blur(20px);
        filter: blur(4px);
        margin: -20px;
      }
    }
    @media screen and (max-width: 768px) {
      padding-left: 0;
    }
  }
}
</style>
