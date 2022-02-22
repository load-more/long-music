<template>
  <div class="current-playlist-wrap">
    <el-drawer
      v-model="isOpenList"
      custom-class="list-drawer"
      :show-close="false"
    >
      <template #title>
        <div class="title-wrap">
          <div class="top">
            <span>当前播放列表</span>
          </div>
          <div class="bottom">
            <span class="song-count">总共 {{ currentSongList.length }} 首</span>
            <span class="clear-all" @click="clearList">清空列表</span>
          </div>
        </div>
      </template>
      <div class="playlist-wrap">
        <el-scrollbar class="scroll-bar">
          <div
            class="item"
            :class="{'active': currentSong.id === item.id}"
            v-for="(item) in currentSongList"
            :key="item.id"
          >
            <div
              class="title single-line-ellipsis"
              :title="`${item.name} ${item.alias ? '(' + item.alias + ')' : ''}`"
            >
              <span>{{ item.name }}</span>
              <span v-if="item.alias">&nbsp;({{ item.alias }})</span>
            </div>
            <div
              class="singer single-line-ellipsis"
              :title="item.author.map(i => i.name).join(' / ')"
            >
              <span v-for="(i, index) in item.author" :key="i.id">
                <span class="name">
                  {{ i.name }}
                </span>
                <span
                  class="seperator"
                  v-if="index !== item.author.length - 1"
                >&nbsp;/&nbsp;</span>
              </span>
            </div>
            <div class="duration single-line-ellipsis">
              <span>{{ formatDuration(item.duration) }}</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useMainStore from '@/store/index'
import { storeToRefs } from 'pinia'
import { formatDuration } from '@/utils/time'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

/* 双向绑定 isOpenList */
const isOpenList = ref(props.modelValue)

watch(() => props.modelValue, () => {
  isOpenList.value = props.modelValue
})
watch(isOpenList, () => {
  emit('update:modelValue', isOpenList.value)
})

const { currentSongList, currentSong } = storeToRefs(useMainStore())

const clearList = () => {
  currentSongList.value = []
}
</script>

<style scoped lang="scss">
.current-playlist-wrap {
  :deep .el-overlay {
    // 设置遮罩层高度
    bottom: 80px;
    height: auto;
    .list-drawer {
      background-color: #222225;
      color: #ddd;
      .title-wrap {
        display: flex;
        flex-direction: column;
        .top {
          font-size: 18px;
          font-weight: bold;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 0;
          .song-count {
            font-size: 13px;
            color: #616161;
          }
          .clear-all {
            font-size: 14px;
            color: rgb(95, 77, 77);
            cursor: pointer;
          }
        }
      }
    }
    #el-drawer__title {
      margin-bottom: 0;
    }
    .el-drawer__body {
      padding-top: 0;
      padding-right: 0;
      padding-bottom: 0;
    }
    .playlist-wrap {
      width: 100%;
      height: 100%;
      .scroll-bar {
        height: 100%;
        .item {
          padding: 10px 0;
          margin-right: 20px;
          border-radius: 5px;
          background-color: #2e2e30;
          margin-bottom: 10px;
          display: flex;
          font-size: 12px;
          line-height: 20px;
          .title {
            padding: 0 5px;
            flex: 3;
          }
          .singer {
            flex: 2;
            color: gray;
          }
          .duration {
            width: 40px;
            color: gray;
          }
        }
        .active {
          background-color: #644a4a;
          .title, .singer {
            color: rgb(219, 109, 109);
          }
        }
      }
    }
  }
}
</style>
