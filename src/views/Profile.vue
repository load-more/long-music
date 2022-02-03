<template>
  <div v-if="detail['nickname']" class="wrap">
    <div class="left">
      <el-avatar :size="200" fit="fit" :src="profile['avatarUrl']"></el-avatar>
    </div>
    <div class="right">
      <div class="top-profile">
        <div class="info">
          <span class="name">{{ detail['nickname'] }}</span>
          <el-tooltip placement="top">
            <template #content>
              当前等级：Lv.{{ detail['level'] }}<br>
              距离下一等级还需：<br>
              1. 听歌：{{ levelInfo['nextPlayCount'] - levelInfo['nowPlayCount'] }} 首<br>
              2. 登录：{{ levelInfo['nextLoginCount'] - levelInfo['nowLoginCount'] }} 天
            </template>
            <span class="level">Lv.{{ detail['level'] }}</span>
          </el-tooltip>
          <span class="gender">
            <i :class="`iconfont icon-${genderArr[detail['gender']]}`"></i>
          </span>
        </div>
        <el-button round>
          <i class="iconfont icon-edit"></i>
          编辑资料
        </el-button>
      </div>
      <el-divider />
      <div class="mid-profile">
        <div class="item">
          <span class="num">{{ detail['follows'] }}</span>
          <span class="label">关注</span>
        </div>
        <div class="item mid-item">
          <span class="num">{{ detail['followeds'] }}</span>
          <span class="label">粉丝</span>
        </div>
        <div class="item">
          <span class="num">{{ detail['listenSongs'] }}</span>
          <span class="label">已听</span>
        </div>
      </div>
      <div class="bottom-profile">
        <div class="signature">
          <span class="label">个人介绍：</span>
          <span class="content">{{ detail['signature'] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserDetail, getUserPlaylist, getUserLevel } from '../api/User'
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { profile, detail, levelInfo } = storeToRefs(mainStore)
const genderArr = ['unknown', 'male', 'female']

const renderPage = async () => {
  const detailRst = await getUserDetail({
    uid: profile.value['userId']
  })
  mainStore.$patch((state) => {
    state.detail = detailRst.data.profile
    state.detail['level'] = detailRst.data.level
    state.detail['listenSongs'] = detailRst.data.listenSongs
  })
  const levelRst = await getUserLevel()
  mainStore.$patch((state) => {
    state.levelInfo = levelRst.data.data
  })
}

renderPage()
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding: 20px;
  .left {
    width: 200px;
    height: 200px;
  }
  .right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 20px;
    .top-profile {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-basis: 18%;
        .name {
          font-size: 22px;
          font-weight: bold;
        }
        .level {
          font-size: 12px;
          border: 1px solid black;
          background-color: #fff;
          padding: 1px 5px;
          border-radius: 20px;
          cursor: pointer;
        }
        .gender {
          font-size: 12px;
          .icon-male {
            color: blue;
          }
          .icon-female {
            color: pink;
          }
          .icon-unknown {
            color: gray;
          }
        }
      }
    }
    .mid-profile {
      display: flex;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center ;
        height: 40px;
        padding: 0 30px;
        .num {
          font-size: 18px;
        }
        .label {
          font-size: 14px;
          color: gray;
        }
      }
      .mid-item {
        border-left: 1px solid gray;
        border-right: 1px solid gray;
      }
    }
    .bottom-profile {
      margin-top: 30px;
      .signature {
        .label {
          font-size: 16px;
        }
        .content {
          font-size: 14px;
          color: gray;
        }
      }
    }
  }
}
</style>
