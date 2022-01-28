<template>
  <div id="wrap">
    <div id="header">
      <GlobalHeader />
    </div>
    <div id="content">
      <!-- 圣杯布局【将主要内容放在前面，使之相较于侧边栏更快渲染出来】 -->
      <div id="main">
        <router-view />
      </div>
      <div id="side">
        <SidebarMenu />
      </div>
    </div>
    <div id="footer">
      <GlobalFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'
</script>

<style scoped lang="scss">
$headerHeight: 70px;
$footerHeight: 80px;
$sideWidth: 200px;
#wrap {
  width: 100%;
  height: 100%;
  position: relative;
  #header {
    width: 100%;
    height: $headerHeight;
    position: absolute;
    top: 0;
  }
  #footer {
    width: 100%;
    height: $footerHeight;
    position: absolute;
    bottom: 0;
  }
  #content {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding-left: $sideWidth;
    position: absolute;
    top: $headerHeight;
    bottom: $footerHeight;
    #main, #side {
      float: left;
      height: 100%;
    }
    #main {
      width: 100%;
    }
    #side {
      width: $sideWidth;
      margin-left: -100%;
      position: relative;
      left: -$sideWidth;
    }
  }
}
</style>
