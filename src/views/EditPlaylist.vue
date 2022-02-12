<template>
  <div class="wrap">
    <h2>编辑歌单信息</h2>
    <div class="content">
      <el-form ref="formRef" :model="playlistForm" class="form">
        <el-form-item label="名称：">
          <el-input v-model="playlistForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签：">
          <el-tag
            v-for="(item, index) in playlistForm.tags"
            :key="index"
            type="success"
          >{{ item }}</el-tag>
          <el-button
            size="small"
            circle
            @click="dialogVisible = true"
          >
            <i class="iconfont icon-add"></i>
          </el-button>
        </el-form-item>
        <el-form-item label="简介：">
          <el-input
            v-model="playlistForm.desc"
            type="textarea"
            maxlength="1000"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <ImageUpdater
        :img-url="coverImgUrl"
        edit-button-label="修改封面"
        :update-img-api="updatePlaylistCoverApi"
      />
    </div>
    <el-button
      type="primary"
      :disabled="isFormChange"
      @click="handleUpdatePlaylist"
      v-loading.fullscreen.lock="isLoading"
      >保存</el-button
    >
    <el-button @click="router.back()">取消</el-button>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="添加标签"
    :before-close="handleDialogClose"
  >
    <div class="container">
      <el-scrollbar height="250px">
        <div
          class="cate"
          v-for="(cate, index) in tagArr"
          :key="index"
        >
          <div class="label">
            <span>{{ cate.name }}</span>
          </div>
          <div class="content">
            <el-tag
              v-for="(item) in cate.arr"
              :key="item.id"
              :type="playlistForm.tags.some(tag => tag === item.name) ? 'danger' : ''"
              @click="handleClickTag(item.name)"
            >{{ item.name }}</el-tag>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="footer-wrap">
        <span>选择合适的标签，最多可选 <strong>3</strong> 个</span>
        <el-button type="primary" @click="handleSaveTags">完成</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, reactive, ref } from 'vue'
import {
  getPlaylistDetail,
  getTagList,
  updatePlaylist,
  updatePlaylistCover,
} from '@/api/playlist'
import { ElMessage } from 'element-plus'
import ImageUpdater from '@/components/image/ImageUpdater.vue'

/* 路由管理 */
const route = useRoute()
const router = useRouter()

/* 渲染数据 */
const playlistId = route.params.id
interface formType {
  name: string
  desc: string
  tags: string[]
}
const playlistForm = reactive<formType>({
  name: '',
  desc: '',
  tags: [],
})
const coverImgUrl = ref('')
interface cateType {
  name: string
  arr: any[]
}
const tagArr = reactive<cateType[]>([])
const dialogVisible = ref(false)

onBeforeMount(async () => {
  /* 获取歌单信息 */
  const { data: playlistData } = await getPlaylistDetail({ id: Number(playlistId) })
  playlistForm.name = playlistData.playlist.name
  playlistForm.tags = playlistData.playlist.tags
  playlistForm.desc = playlistData.playlist.description
  coverImgUrl.value = playlistData.playlist.coverImgUrl
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
})

/* 修改标签 */
const cachedTags = reactive<string[]>([])
const handleClickTag = (tagName: string) => {
  // 检查标签是否已选择
  const index = playlistForm.tags.findIndex((tag) => tag === tagName)
  if (index !== -1) { // 如果已选择，则剔除选择的标签
    playlistForm.tags.splice(index, 1)
  } else if (playlistForm.tags.length < 3) { // 如果未选且标签数量没有超出限制，则直接添加标签
    playlistForm.tags.push(tagName)
  }
}
const handleSaveTags = () => {
  // 点击保存按钮后，缓存 tag 数组
  cachedTags.splice(0)
  cachedTags.push(...playlistForm.tags)
  dialogVisible.value = false
}
const handleDialogClose = (done: () => void) => {
  // 未保存直接关闭，则恢复缓存的 tag 数据
  playlistForm.tags.splice(0)
  playlistForm.tags.push(...cachedTags)
  done()
}

/* 提交修改 */
const isLoading = ref(false)
const handleUpdatePlaylist = async () => {
  isLoading.value = true
  const { data } = await updatePlaylist({
    id: Number(playlistId),
    name: playlistForm.name,
    desc: playlistForm.desc,
    tags: playlistForm.tags.join(';'),
  })
  if (data.code === 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
      appendTo: document.body,
    })
  }
  isLoading.value = false
}

const isFormChange = ref(false)
/* 修改封面 */
const updatePlaylistCoverApi = (file: File, imgSize: number) => {
  const fd = new FormData()
  fd.append('imgFile', file)
  return updatePlaylistCover(fd, {
    id: Number(playlistId),
    imgSize,
  })
}
</script>

<style scoped lang="scss">
.wrap {
  padding: 20px;
  .content {
    display: flex;
    .form {
      width: 500px;
      margin-right: 200px;
      .el-tag {
        margin-right: 10px;
      }
    }
    .cover-wrap {
      display: flex;
      flex-direction: column;
      .cover {
        width: 200px;
        height: 200px;
      }
    }
  }
}
.el-dialog {
  .container {
    .cate {
      width: 100%;
      display: flex;
      .label {
        flex-basis: 20%;
        padding-top: 4px;
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
</style>
