<template>
  <div class="wrap">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

withDefaults(defineProps<{
  text: string
}>(), {
  text: '内容为空',
})
</script>

<style scoped lang="scss">
.wrap {
  text-align: center;
  color: $font-inactive-color;
  font-size: 14px;
  padding: 20px;
}
</style>
