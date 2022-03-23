<template>
  <div class="volume-bar-wrap">
    <span class="percent">{{ percent }}</span>
    <div class="bar-wrap" @mousedown="handleWrapMousedown($event)">
      <div class="bar" ref="barRef" :style="{height: `${props.modelValue}px`}"></div>
      <div class="dot" @mousedown="handleDotMousedown"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const barRef = ref<HTMLElement | null>(null)
const isMouseDown = ref(false)
const percent = ref(props.modelValue)

const getOffsetY = (event: MouseEvent) => {
  const barHeight = barRef.value?.clientHeight
  const target = event.target as HTMLElement
  const { className } = target
  const { offsetY } = event
  let rst = 0
  if (className === 'bar-wrap') {
    rst = 100 - offsetY
  } else if (className === 'bar') {
    rst = barHeight! - offsetY
  } else if (className === 'dot') {
    rst = barHeight! + 5 - offsetY
  }
  return rst
}

// 这里使用 mousedown 事件而不是 click 事件，
// 是为了防止子元素的 mousedown 和 mouseup 通过冒泡触发父元素的 click 事件。
const handleWrapMousedown = (event: MouseEvent) => {
  const offsetY = getOffsetY(event)
  percent.value = offsetY
  barRef.value!.style.height = `${offsetY}px`
  emit('update:modelValue', offsetY)
}

const handleDotMousedown = (event: MouseEvent) => {
  event.stopPropagation() // 阻止 mousedown 事件冒泡
  isMouseDown.value = true
  const originY = event.clientY
  const offsetY = getOffsetY(event)
  let height = offsetY
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (isMouseDown.value) {
      const deltaY = originY - e.clientY
      height = offsetY + deltaY
      if (height > 100) {
        height = 100
      }
      if (height < 0) {
        height = 0
      }
      barRef.value!.style.height = `${height}px`
      percent.value = height
      emit('update:modelValue', height)
    }
  })
  document.addEventListener('mouseup', () => {
    if (isMouseDown.value) {
      isMouseDown.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.volume-bar-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .percent {
    font-size: 12px;
    color: $font-inactive-color;
  }

  .bar-wrap {
    width: 5px;
    height: 100px;
    border-radius: 3px;
    background-color: $bar-bg-color;
    display: flex;
    flex-direction: column-reverse;
    &:hover {
      box-shadow: $bar-box-shadow;
      .dot {
        box-shadow: $bar-box-shadow;
      }
    }
    .bar {
      width: 5px;
      border-radius: 3px;
      background-color: $bar-color;
      min-height: 0;
      max-height: 100px;
    }
    .dot {
      flex-shrink: 0; // 防止被挤压
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $bar-color;
      margin-left: -2.5px;
      margin-bottom: -5px;
    }
  }
}
</style>
