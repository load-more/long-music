<template>
  <el-select
    class="select"
    v-model="provinceRef"
    @change="onProvinceChange"
    popper-class="select-popper"
  >
    <el-option
      v-for="item in region"
      :key="item"
      :label="item.label"
      :value="item.code"
    ></el-option>
  </el-select>
  <el-select
    class="select"
    v-model="cityRef"
    popper-class="select-popper"
    :disabled="
      region.find((item) => item.code === province)?.children.length === 0
    "
  >
    <el-option
      v-for="item in region.find((item) => item.code === province)?.children"
      :key="item"
      :label="item.label"
      :value="item.code"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import region from '@/assets/ts/region'
import { watch, ref } from 'vue'

const props = defineProps({
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
})
const provinceRef = ref(props.province)
const cityRef = ref(props.city)
const emit = defineEmits(['update:province', 'update:city'])

// 如果 city 为空，则将 city 置空
if (
  region.find((item) => item.code === provinceRef.value)?.children.length === 0
) {
  emit('update:city', '')
}

watch(
  () => provinceRef.value,
  () => {
    emit('update:province', provinceRef.value)
  },
)
watch(
  () => cityRef.value,
  () => {
    emit('update:city', cityRef.value)
  },
)

// 每次更新完 province 后，更新 city
const onProvinceChange = () => {
  const children = region.find((item) => item.code === provinceRef.value)?.children
  if (children?.length) {
    emit(
      'update:city',
      region.find((item) => item.code === provinceRef.value)?.children[0].code,
    )
  } else {
    emit('update:city', '')
  }
}
</script>

<style scoped lang="scss">
.select {
  width: 105px;
  margin-right: 10px;
}
</style>
