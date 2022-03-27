<template>
  <canvas ref="canvasRef" id="canvas"></canvas>
</template>

<script setup lang="ts">
/* eslint-disable no-param-reassign */
import {
  withDefaults, ref, onMounted, onUnmounted,
} from 'vue'

interface PropType {
  offsetAngle?: number,
  angleTransitionTime?: number,
  mouseRadius?: number,
  lineSpeedY?: number,
  lineLen?: number,
  lineColor?: number,
  lineNum?: number,
  dropSpeedX?: number,
  dropSpeedY?: number,
  dropColor?: number,
  dropNum?: number,
}
const props = withDefaults(defineProps<PropType>(), {
  offsetAngle: 45,
  angleTransitionTime: 10,
  mouseRadius: 50,
  lineSpeedY: 30,
  lineLen: 28,
  lineColor: 50,
  lineNum: 2,
  dropSpeedX: 2,
  dropSpeedY: 1,
  dropColor: 4,
  dropNum: 5,
})

const canvasRef = ref()
const ctx = ref()
onMounted(() => {
  // 设置画布大小（注意，这一步很重要，否则绘制的线条将变得粗大模糊）
  canvasRef.value.width = canvasRef.value.clientWidth
  canvasRef.value.height = canvasRef.value.clientHeight
  ctx.value = canvasRef.value?.getContext('2d')

  interface lineType {
    x: number,
    y: number,
    length: number,
    dy: number,
    color: string,
    exist: boolean,
  }
  const lineArr: lineType[] = []
  interface dropType {
    exist: boolean,
    x: number,
    y: number,
    speedX: number,
    speedY: number,
    radius: number,
    color: string,
  }
  const dropArr: dropType[] = []
  const mousePos = [0, 0] // 鼠标位置
  let offsetXRatio = 0 // 鼠标相对于屏幕中间的偏移率（范围是 -1 ~ 1）
  let maxAngle = 0 // 最大雨线夹角
  let angle = 0 // 雨线夹角（每帧更新一次，直到等于 maxAngle）

  // 生成一个随机整数：[min, max]
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
  // 生成一个随机小数：[min, max] 默认两位小数
  const randomFlo = (min: number, max: number, digit = 2) => +(Math.random()
  * (max - min) + min).toFixed(digit)

  const resizeListener = () => {
    canvasRef.value.width = canvasRef.value.clientWidth
    canvasRef.value.height = canvasRef.value.clientHeight
  }
  const mousemoveListener = (e: MouseEvent) => {
    mousePos[0] = e.clientX
    mousePos[1] = e.clientY
    // 根据比率更新最大夹角
    offsetXRatio = (e.clientX * 2) / canvasRef.value.clientWidth - 1
    maxAngle = Math.asin(offsetXRatio) * (props.offsetAngle / 90)
  }

  window.addEventListener('resize', resizeListener)
  window.addEventListener('mousemove', mousemoveListener)

  const createLines = (num: number) => {
    for (let i = 0; i < num; i += 1) {
      const randomLen = randomInt(props.lineLen - 10, props.lineLen + 10)
      const randomDy = randomInt(props.lineSpeedY - 2, props.lineSpeedY + 2)
      const line = {
        x: randomFlo(-0.5, 1.5) * canvasRef.value.width,
        y: -50,
        length: randomLen,
        dy: randomDy,
        color: `rgb(${(randomLen * 255) / props.lineColor},
                  ${(randomLen * 255) / props.lineColor},
                  ${(randomLen * 255) / props.lineColor})`,
        exist: true,
      }
      lineArr.push(line)
    }
  }

  const createDrops = (num: number, x: number, y: number) => {
    for (let i = 0; i < num; i += 1) {
      const randomRadius = randomFlo(1, 4)
      const drop = {
        exist: true,
        x,
        y,
        speedX: randomFlo(-8, 8),
        speedY: randomFlo(-9, -6),
        radius: randomRadius,
        color: `rgb(${(randomRadius * 255) / props.dropColor},
                      ${(randomRadius * 255) / props.dropColor},
                      ${(randomRadius * 255) / props.dropColor})`,
      }
      dropArr.push(drop)
    }
  }

  const removeRain = (objArr: lineType[] | dropType[]) => {
    for (let i = objArr.length - 1; i >= 0; i -= 1) {
      if (!objArr[i].exist) {
        objArr.splice(i, 1)
      }
    }
  }

  const render = () => {
    // 清除上一次绘制记录
    ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

    ctx.value.lineWidth = 1
    lineArr.forEach((line) => {
      ctx.value.strokeStyle = line.color
      ctx.value.beginPath()
      ctx.value.moveTo(line.x, line.y)
      ctx.value.lineTo(
        line.x + Math.sin(angle) * line.length,
        line.y + Math.cos(angle) * line.length,
      )
      ctx.value.stroke()
    })

    ctx.value.lineWidth = 1
    dropArr.forEach((drop) => {
      ctx.value.strokeStyle = drop.color
      ctx.value.beginPath()
      ctx.value.arc(drop.x, drop.y, drop.radius, randomFlo(0, Math.PI * 2), Math.PI)
      ctx.value.stroke()
    })
  }

  // 更新页面
  const update = () => {
    // 1. 更新雨线
    // 逐步增加角度，形成缓慢过渡效果（花多少帧的时间完成过渡）
    angle += (maxAngle - angle) / (props.angleTransitionTime / 0.167)
    // 更新雨线位置
    if (lineArr.length) {
      lineArr.forEach((line) => {
        if (line.y < mousePos[1] + props.mouseRadius) {
          // 省去一些计算
          // 雨线末端坐标
          const endX = line.x + Math.sin(angle) * line.length
          const endY = line.y + Math.cos(angle) * line.length
          const r = Math.sqrt((endX - mousePos[0]) ** 2 + (endY - mousePos[1]) ** 2)
          if (r <= props.mouseRadius) {
            line.exist = false
            createDrops(randomInt(props.dropNum - 1, props.dropNum + 1), endX, endY)
          }
        }
        // 更新雨线坐标值
        line.x += Math.tan(angle) * line.dy
        line.y += line.dy
        // 清除过界的雨线
        if (line.y > canvasRef.value.clientHeight) {
          line.exist = false
        }
      })
    }
    // 删除超出下边界的雨线
    removeRain(lineArr)
    // 创建雨线
    createLines(randomInt(props.lineNum - 1, props.lineNum + 1))

    // 2. 更新雨滴
    if (dropArr.length) {
      dropArr.forEach((drop) => {
        drop.speedX += Math.sin(angle) * props.dropSpeedX
        drop.x += drop.speedX

        drop.speedY += props.dropSpeedY
        drop.y += drop.speedY

        if (drop.y > canvasRef.value.clientHeight) {
          drop.exist = false
        }
      })
    }
    // 删除过界的雨滴
    removeRain(dropArr)

    // 渲染元素
    render()

    // 递归更新
    requestAnimationFrame(update)
  }

  requestAnimationFrame(update)

  onUnmounted(() => {
    window.removeEventListener('resize', resizeListener)
    window.removeEventListener('mousemove', mousemoveListener)
  })
})

</script>

<style scoped lang="scss">
#canvas {
  width: 100%;
  height: 100%;
}
</style>
