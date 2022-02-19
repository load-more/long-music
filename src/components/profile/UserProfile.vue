<template>
  <div class="profile-wrap">
    <div class="left">
      <el-avatar :size="200" :src="state.avatarUrl"></el-avatar>
    </div>
    <div class="right">
      <div class="top-profile">
        <div class="info">
          <span class="name">{{ state.nickname }}</span>
          <el-tooltip placement="top">
            <template #content>
              当前等级：Lv.{{ state.level }}<br />
              距离下一等级还需：<br />
              1. 听歌：{{
                state.nextPlayCount - state.nowPlayCount
              }}
              首<br />
              2. 登录：{{ state.nextLoginCount - state.nowLoginCount }} 天
            </template>
            <span class="level">Lv.{{ state.level }}</span>
          </el-tooltip>
          <span class="gender">
            <i :class="`iconfont icon-${genderArr[state.level]}`"></i>
          </span>
        </div>
        <el-button round @click="router.push({ name: 'editProfile' })">
          <i class="iconfont icon-edit"></i>
          编辑资料
        </el-button>
      </div>
      <el-divider />
      <div class="mid-profile">
        <div class="item">
          <span class="num">{{ state.follows }}</span>
          <span class="label">关注</span>
        </div>
        <div class="item mid-item">
          <span class="num">{{ state.followeds }}</span>
          <span class="label">粉丝</span>
        </div>
        <div class="item">
          <span class="num">{{ state.listenSongs }}</span>
          <span class="label">已听</span>
        </div>
      </div>
      <div class="bottom-profile">
        <div class="signature">
          <span class="label">个人介绍：</span>
          <span class="content">{{ state.signature }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import { getUserDetail, getUserLevel } from '@/api/user'
import { useRouter } from 'vue-router'
import { Decrypt } from '@/utils/secret'

/* 路由管理 */
const router = useRouter()

/* 渲染数据 */
const state = reactive({
  nickname: '',
  level: '',
  avatarUrl: '',
  gender: '',
  signature: '',
  nextPlayCount: 0,
  nowPlayCount: 0,
  nextLoginCount: 0,
  nowLoginCount: 0,
  follows: '',
  followeds: '',
  listenSongs: '',
})
const genderArr = ['unknown', 'male', 'female']

const getData = async () => {
  const uid = Decrypt(String(window.localStorage.getItem('uid')))
  // 获取用户个人信息
  const { data: detailData } = await getUserDetail({ uid })
  state.level = detailData.level
  state.listenSongs = detailData.listenSongs
  state.nickname = detailData.profile.nickname
  state.avatarUrl = detailData.profile.avatarUrl
  state.gender = detailData.profile.gender
  state.signature = detailData.profile.signature
  state.follows = detailData.profile.follows
  state.followeds = detailData.profile.followeds
  // 获取用户等级信息
  const { data: levelData } = await getUserLevel()
  state.nextPlayCount = levelData.data.nextPlayCount
  state.nowPlayCount = levelData.data.nowPlayCount
  state.nextLoginCount = levelData.data.nextLoginCount
  state.nowLoginCount = levelData.data.nowLoginCount
}
onBeforeMount(() => {
  getData()
})
</script>

<style scoped lang="scss">
.profile-wrap {
  display: flex;
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
        align-items: center;
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
