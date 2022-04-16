<template>
  <div class="tag-selector-wrap">
    <el-tag v-for="(item, index) in tags" :key="index" type="success">
    {{ item }}
    </el-tag>
    <el-button size="small" circle @click="dialogVisible = true">
      <i class="iconfont icon-add"></i>
    </el-button>
    <div class="dialog-wrap">
      <el-dialog
        v-model="dialogVisible"
        :before-close="handleDialogClose"
      >
        <template #title>
          <span class="dialog-title">添加标签</span>
        </template>
        <div class="container">
          <el-scrollbar height="250px">
            <div class="cate" v-for="(cate, index) in tagArr" :key="index">
              <div class="label">
                <span>{{ cate.name }}</span>
              </div>
              <div class="content">
                <el-tag
                  v-for="item in cate.arr"
                  :key="item.id"
                  :type="tags.some((tag) => tag === item.name) ? 'danger' : ''"
                  @click="handleClickTag(item.name)"
                  >{{ item.name }}</el-tag
                >
              </div>
            </div>
          </el-scrollbar>
        </div>
        <template #footer>
          <div class="footer-wrap">
            <span>选择合适的标签，最多可选 <strong>3</strong> 个</span>
            <el-button class="primary-btn" @click="handleSaveTags">完成</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue'
import { getTagList } from '@/api/playlist'

const props = defineProps<{
  tags: string[]
}>()
const emit = defineEmits(['update:tags'])

const tagArr = reactive<{
  name: string
  arr: any[]
}[]>([])

const getData = async () => {
  /* 获取标签信息 */
  const { data: tagData } = await getTagList()
  const cateMap = ['语种', '风格', '场景', '情感', '主题']
  tagData.tags.forEach((item: any) => {
    const index = item.category
    if (!tagArr[index]) {
      tagArr[index] = {
        name: '',
        arr: [],
      }
    }
    tagArr[index].name = cateMap[index]
    tagArr[index].arr.push(item)
  })
}

onBeforeMount(() => {
  getData()
})

const dialogVisible = ref(false)
/* 修改标签 */
const cachedTags = reactive<string[]>([])
const handleClickTag = (tagName: string) => {
  // 检查标签是否已选择
  const index = props.tags.findIndex((tag) => tag === tagName)
  const temp = props.tags.slice()
  if (index !== -1) {
    // 如果已选择，则剔除选择的标签
    temp.splice(index, 1)
    emit('update:tags', temp)
  } else if (props.tags.length < 3) {
    // 如果未选且标签数量没有超出限制，则直接添加标签
    temp.push(tagName)
    emit('update:tags', temp)
  }
}
const handleSaveTags = () => {
  // 点击保存按钮后，缓存 tag 数组
  cachedTags.splice(0)
  cachedTags.push(...props.tags)
  dialogVisible.value = false
}
const handleDialogClose = (done: () => void) => {
  // 未保存直接关闭，则恢复缓存的 tag 数据
  emit('update:tags', [...cachedTags])
  done()
}
</script>

<style scoped lang="scss">
.tag-selector-wrap {
  .el-tag {
    margin-right: 10px;
  }
  .dialog-wrap {
    :deep .el-dialog {
      border-radius: 10px;
      @media screen and (max-width: 768px) {
        width: 95%;
      }
    }
    .dialog-title {
      font-family: 'yahei';
    }
    .container {
      .cate {
        width: 100%;
        display: flex;
        .el-tag {
          margin-top: 5px;
        }
        .label {
          flex-basis: 20%;
          text-align: center;
        }
        .content {
          flex-basis: 80%;
          display: flex;
          flex-wrap: wrap;
          .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .footer-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        color: gray;
      }
    }
  }
}
</style>
