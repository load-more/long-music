<template>
  <div class="playlist-edit-form-wrap">
    <div class="content">
      <el-form ref="formRef" :model="playlistForm" class="form">
        <el-form-item label="名称：">
          <el-input v-model="playlistForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签：">
          <TagSelector
            v-model:tags="playlistForm.tags"
          />
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
      <div class="updater-wrap">
        <ImageUpdater
          :img-url="coverImgUrl"
          edit-button-label="修改封面"
          :update-img-api="updatePlaylistCoverApi"
        />
      </div>
    </div>
    <el-button
      class="primary-btn"
      :disabled="isFormChange"
      @click="handleUpdatePlaylist"
      v-loading.fullscreen.lock="isLoading"
      >保存</el-button
    >
    <el-button @click="router.back()">取消</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, reactive, ref } from 'vue'
import {
  getPlaylistDetail,
  updatePlaylist,
  updatePlaylistCover,
} from '@/api/playlist'
import { ElMessage } from 'element-plus'
import ImageUpdater from '@/components/form/ImageUpdater.vue'
import TagSelector from '@/components/form/TagSelector.vue'
import { playlistEditFormType } from '@/assets/ts/type'

/* 路由管理 */
const route = useRoute()
const router = useRouter()

/* 渲染数据 */
const playlistId = Number(route.params.id)

const playlistForm = reactive<playlistEditFormType>({
  name: '',
  desc: '',
  tags: [],
})
const coverImgUrl = ref('')

onBeforeMount(async () => {
  /* 获取歌单信息 */
  const { data: playlistData } = await getPlaylistDetail({ id: playlistId })
  playlistForm.name = playlistData.playlist.name
  playlistForm.tags = playlistData.playlist.tags
  playlistForm.desc = playlistData.playlist.description
  coverImgUrl.value = playlistData.playlist.coverImgUrl
})

/* 提交修改 */
const isLoading = ref(false)
const handleUpdatePlaylist = async () => {
  isLoading.value = true
  const { data } = await updatePlaylist({
    id: playlistId,
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
    id: playlistId,
    imgSize,
  })
}
</script>

<style scoped lang="scss">
.playlist-edit-form-wrap {
  .content {
    display: flex;
    justify-content: space-between;
    .updater-wrap {
      width: 200px;
      padding: 0 20px;
    }
  }
  @media screen and (max-width: 768px) {
    .content {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      .updater-wrap {
        width: 40%;
        margin-bottom: 40px;
      }
      .form {
        width: 100%;
        margin-right: 0;
      }
    }
  }
}
</style>
