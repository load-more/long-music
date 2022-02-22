<template>
  <div class="music-progress-bar-wrap">
    <span class="left-label" v-if="showLabel">{{ formatDuration(currentTimeLabel, 's') }}</span>
    <div
      class="bar-wrap"
      ref="barWrap"
      @mousedown="handleWrapMousedown($event)"
    >
      <div
        class="bar"
        ref="bar"
      ></div>
      <div
        class="dot"
        ref="dot"
        @mousedown="handleDotMouseDown($event)"
      ></div>
    </div>
    <span class="right-label" v-if="showLabel">{{ formatDuration(duration, 's') }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { formatDuration } from '@/utils/time'

const props = defineProps({
  duration: {
    type: Number,
    required: true,
  },
  currentTime: {
    type: Number,
    required: true,
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['updateCurrentTime'])

const bar = ref<HTMLElement | null>(null)
const barWrap = ref<HTMLElement | null>(null)
const dot = ref<HTMLElement | null>(null)
const isMouseDown = ref(false)
const isAdjustProgress = ref(false)
const currentTimeLabel = ref(props.currentTime)

/* 监视 currentTime */
watch(() => props.currentTime, () => {
  // 当用户没有点击或拖拽进度条时，更新数据
  if (bar.value && !isAdjustProgress.value) {
    // 更新 currentTimeLabel
    currentTimeLabel.value = props.currentTime
    // 更新进度条
    let per = '0px'
    if (props.duration !== 0) { // 防止出现除以 0 等于 NaN
      per = `${(props.currentTime / props.duration) * 100}%`
    }
    bar.value.style.width = per
  }
}, { immediate: true })

const controlProgress = (offset: number, width: number) => {
  // 用户点击或拖拽进度条修改 currentTimeLabel
  const ct = Math.round((offset / width) * props.duration)
  currentTimeLabel.value = ct < 0 ? 0 : ct // 避免出现负值
}

// 这里使用 mousedown 事件而不是 click 事件，
// 是为了防止子元素的 mousedown 和 mouseup 通过冒泡触发父元素的 click 事件。
const handleWrapMousedown = (event: MouseEvent) => {
  isAdjustProgress.value = true
  const { offsetX } = event
  const wrapWidth = barWrap.value!.clientWidth
  controlProgress(offsetX, wrapWidth)
  emit('updateCurrentTime', currentTimeLabel.value)
  isAdjustProgress.value = false
}

const handleDotMouseDown = (event: MouseEvent) => {
  isAdjustProgress.value = true
  event.stopPropagation() // 阻止 mousedown 事件冒泡
  isMouseDown.value = true
  barWrap.value?.classList.add('active')
  const leftVal = event.clientX - dot.value!.offsetLeft // 父元素相对于浏览器左边界的横向距离
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (isMouseDown.value) {
      if (e.clientX < leftVal) { // 如果鼠标超出左边界
        bar.value!.style.width = '0px'
        controlProgress(0, 1)
      } else if (e.clientX >= leftVal + barWrap.value!.clientWidth) { // 如果超出右边界
        bar.value!.style.width = '100%'
        controlProgress(1, 1)
      } else { // 如果在正常范围内
        bar.value!.style.width = `${e.clientX - leftVal}px`
        controlProgress(e.clientX - leftVal, barWrap.value!.clientWidth)
      }
    }
  })
  document.addEventListener('mouseup', () => {
    if (isMouseDown.value) {
      isMouseDown.value = false
      barWrap.value?.classList.remove('active')
      emit('updateCurrentTime', currentTimeLabel.value)
      isAdjustProgress.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.music-progress-bar-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  .left-label, .right-label {
    font-size: 12px;
    color: gray;
  }
  .left-label {
    margin-right: 10px;
  }
  .right-label {
    margin-left: 10px;
  }
  .bar-wrap {
    width: 100%;
    height: 3px;
    border-radius: 100px;
    background-color: gray;
    display: flex;
    align-items: center;
    position: relative;
    .bar {
      background-color: red;
      border-radius: 100px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      height: 100%;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: red;
      margin-left: -1px;
      display: none;
      box-shadow: 0 0 15px white;
    }
  }
  .bar-wrap:hover, .active {
    height: 5px;
    box-shadow: 0 0 23px white;
    .dot {
      display: block;
    }
  }
}
</style>
