<template>
  <div class="loader-wrap">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.loader-wrap {
  width: 100%;
  height: 100%;
  font-size: 5px;
  @include flex-center;
}
.loader {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  animation: load-effect 1s infinite linear;
}
@keyframes load-effect {
  0% {
    box-shadow:
      /*
        0: 左移3em
        -3em: 下移2em
        0: 模糊距离0，即纯色
        .2em: 外扩.2em
        $font-active-color: 白色
      */
      0 -3em 0 .2em $font-active-color,/*上*/
      2em -2em 0 0 $font-active-color,/*右上*/
      3em 0 0 -.5em $font-active-color,/*右*/
      2em 2em 0 -.5em $font-active-color,/*右下*/
      0 3em 0 -.5em $font-active-color, /*下*/
      -2em 2em 0 -.5em $font-active-color, /*左下*/
      -3em 0 0 -.5em $font-active-color, /*左*/
      -2em -2em 0 0 $font-active-color;/*左上*/
  }
  12.5% {
    box-shadow:
      0 -3em 0 0 $font-active-color,
      2em -2em 0 .2em $font-active-color,
      3em 0 0 0 $font-active-color,
      2em 2em 0 -.5em $font-active-color,
      0 3em 0 -.5em $font-active-color,
      -2em 2em 0 -.5em $font-active-color,
      -3em 0 0 -.5em $font-active-color,
      -2em -2em 0 -.5em $font-active-color;
 }
  25% {
    box-shadow:
      0 -3em 0 -.5em $font-active-color,
      2em -2em 0 0 $font-active-color,
      3em 0 0 .2em $font-active-color,
      2em 2em 0 0 $font-active-color,
      0 3em 0 -.5em $font-active-color,
      -2em 2em 0 -.5em $font-active-color,
      -3em 0 0 -.5em $font-active-color,
      -2em -2em 0 -.5em $font-active-color;
  }
  37.5% {
    box-shadow:
      0 -3em 0 -.5em $font-active-color,
      2em -2em 0 -.5em $font-active-color,
      3em 0 0 0 $font-active-color,
      2em 2em 0 .2em $font-active-color,
      0 3em 0 0 $font-active-color,
      -2em 2em 0 -.5em $font-active-color,
      -3em 0 0 -.5em $font-active-color,
      -2em -2em 0 -.5em $font-active-color;
  }
  50% {
    box-shadow:
      0 -3em 0 -.5em $font-active-color,
      2em -2em 0 -.5em $font-active-color,
      3em 0 0 -.5em $font-active-color,
      2em 2em 0 0 $font-active-color,
      0 3em 0 .2em $font-active-color,
      -2em 2em 0 0 $font-active-color,
      -3em 0 0 -.5em $font-active-color,
      -2em -2em 0 -.5em $font-active-color;
  }
  62.5% {
    box-shadow:
      0 -3em 0 -.5em $font-active-color,
      2em -2em 0 -.5em $font-active-color,
      3em 0 0 -.5em $font-active-color,
      2em 2em 0 -.5em $font-active-color,
      0 3em 0 0 $font-active-color,
      -2em 2em 0 .2em $font-active-color,
      -3em 0 0 0 $font-active-color,
      -2em -2em 0 -.5em $font-active-color;
  }
  75% {
    box-shadow:
      0 -3em 0 -.5em $font-active-color,
      2em -2em 0 -.5em $font-active-color,
      3em 0 0 -.5em $font-active-color,
      2em 2em 0 -.5em $font-active-color,
      0 3em 0 -.5em $font-active-color,
      -2em 2em 0 0 $font-active-color,
      -3em 0 0 .2em $font-active-color,
      -2em -2em 0 0 $font-active-color;
  }
  87.5% {
    box-shadow:
      0 -3em 0 0 $font-active-color,
      2em -2em 0 -.5em $font-active-color,
      3em 0 0 -.5em $font-active-color,
      2em 2em 0 -.5em $font-active-color,
      0 3em 0 -.5em $font-active-color,
      -2em 2em 0 0 $font-active-color,
      -3em 0 0 0 $font-active-color,
      -2em -2em 0 .2em $font-active-color;
  }
  100% {
    box-shadow:
      0 -3em 0 .2em $font-active-color,
      2em -2em 0 0 $font-active-color,
      3em 0 0 -.5em $font-active-color,
      2em 2em 0 -.5em $font-active-color,
      0 3em 0 -.5em $font-active-color,
      -2em 2em 0 -.5em $font-active-color,
      -3em 0 0 -.5em $font-active-color,
      -2em -2em 0 0 $font-active-color;
  }
}
</style>
