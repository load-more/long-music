<template>
  <el-select
    class="select"
    v-model="province"
    @change="onProvinceChange"
  >
    <el-option
      v-for="(item) in region"
      :key="item"
      :label="item.label"
      :value="item.code"
    ></el-option>
  </el-select>
  <el-select
    class="select"
    v-model="city"
    :disabled="region.find(item => item.code === province)?.children.length === 0"
  >
    <el-option
      v-for="(item) in region.find(item => item.code === province)?.children"
      :key="item"
      :label="item.label"
      :value="item.code"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import region from '../../utils/region'
import { watch } from 'vue'

const props = defineProps({
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:province', 'update:city'])

// 如果 city 为空，则将 city 置空
if (region.find(item => item.code === props.province)?.children.length === 0) {
  emit('update:city', '')
}

watch(() => props.province, () => {
  emit('update:province', props.province)
})
watch(() => props.city, () => {
  emit('update:city', props.city)
})

// 每次更新完 province 后，更新 city
const onProvinceChange = () => {
  const children = region.find(item => item.code === props.province)?.children
  if (children?.length) {
    emit('update:city', region.find(item => item.code === props.province)?.children[0].code)
  } else {
    emit('update:city', '')
  }
}
</script>

<style scoped lang="scss">
.select {
  width: 160px;
  margin-right: 10px;
}
</style>
