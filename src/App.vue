<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script setup lang="ts">
import { initTheme } from '@/utils/theme'

initTheme()
</script>

<style lang="scss"></style>
