<template>
  <div class="profile-wrap">
    <div class="left">
      <el-avatar
        class="avatar"
        :src="state.avatarUrl"
        shape="circle"
      ></el-avatar>
    </div>
    <div class="right">
      <div class="top-profile">
        <div class="info">
          <span class="name">{{ state.nickname }}</span>
          <el-tooltip placement="top" :show-arrow="false" popper-class="level-popper">
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
          <span class="gender" v-if="state.gender">
            <i :class="`iconfont icon-${genderArr[state.gender]}`"></i>
          </span>
        </div>
        <el-button round @click="router.push({ name: 'editProfile' })">
          <i class="iconfont icon-edit"></i>
          编辑资料
        </el-button>
      </div>
      <div class="mid-profile">
        <div class="item left-item" @click="handleClickFollow">
          <span class="num">{{ state.follows }}</span>
          <span class="label">关注</span>
        </div>
        <div class="item mid-item">
          <div class="mid-wrap">
            <span class="num">{{ state.followeds }}</span>
            <span class="label">粉丝</span>
          </div>
        </div>
        <div class="item right-item">
          <span class="num">{{ state.listenSongs }}</span>
          <span class="label">已听</span>
        </div>
      </div>
      <div class="bottom-profile">
        <div class="createTime">
          <span class="label">注册时间：</span>
          <span class="content">{{ createTime }}</span>
        </div>
        <div class="region">
          <span class="label">所在地区：</span>
          <span class="content">{{ region }}</span>
        </div>
        <div class="signature">
          <span class="label">个人介绍：</span>
          <span class="content">{{ state.signature }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, computed } from 'vue'
import { getUserDetail, getUserLevel } from '@/api/user'
import { useRouter, useRoute } from 'vue-router'
import { Decrypt } from '@/utils/secret'
import { getLocalTime } from '@/utils/time'
import regionData from '@/utils/region'

/* 路由管理 */
const router = useRouter()
const route = useRoute()

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
  createTime: 0,
  province: 0,
  city: 0,
})
const genderArr = ['unknown', 'male', 'female']
const uid = route.params.id || Decrypt(String(window.localStorage.getItem('uid')))

const getData = async () => {
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
  state.createTime = detailData.profile.createTime
  state.province = detailData.profile.province
  state.city = detailData.profile.city
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

/* 格式化日期 */
const createTime = computed(() => {
  const obj = getLocalTime(state.createTime)
  return `${obj.year}-${obj.month}-${obj.date}`
})

/* 所在地区 */
const region = computed(() => {
  let province = ''
  let city = ''
  if (state.province) {
    regionData.forEach((p) => {
      if (p.code === String(state.province)) {
        province = p.value
        if (p.children.length) {
          p.children.forEach((c) => {
            if (c.code === String(state.city)) {
              city = c.value
              return null
            }
            return null
          })
        }
        return null
      }
      return null
    })
  }
  return `${province}-${city}`
})

/* 点击关注 */
const handleClickFollow = () => {
  router.push({ name: 'follows' })
}
</script>

<style scoped lang="scss">
.profile-wrap {
  display: flex;
  color: $font-color;
  .left {
    width: 220px;
    .avatar {
      width: 200px;
      height: 200px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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
          background-color: $level-label-color;
          padding: 1px 5px;
          border-radius: 20px;
          cursor: pointer;
          margin: 0 10px;
        }
        .gender {
          font-weight: bold;
          font-size: 12px;
          .icon-male, .icon-female {
            color: $gender-icon-color;
          }
        }
      }
    }
    .mid-profile {
      display: flex;
      margin: 20px 0;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        .num {
          font-size: 18px;
        }
        .label {
          font-size: 14px;
          color: $font-inactive-color;
        }
        .mid-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          &:hover {
            cursor: pointer;
            span {
              color: $font-active-color;
            }
          }
        }
      }
      .mid-item {
        border-left: 1px solid $font-inactive-color;
        border-right: 1px solid $font-inactive-color;
        padding: 0 30px;
        box-sizing: content-box;
      }
      .left-item {
        margin-right: 30px;
      }
      .right-item {
        margin-left: 30px;
      }
      .left-item:hover, .right-item:hover {
        cursor: pointer;
        span {
          color: $font-active-color;
        }
      }
    }
    .bottom-profile {
      .label {
        color: $font-inactive-color;
        font-size: 15px;
      }
      .content {
        font-size: 14px;
      }
      .region {
        margin: 10px 0;
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    .left {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .avatar {
        width: 40%;
        height: auto;
      }
    }
  }
}
</style>
