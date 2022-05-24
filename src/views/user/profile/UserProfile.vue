<template>
  <div class="profile-wrap">
    <div class="left">
      <el-avatar
        class="avatar"
        :src="`${user?.profile.avatarUrl}?param=200y200`"
        shape="circle"
      ></el-avatar>
    </div>
    <div class="right">
      <div class="top-profile">
        <div class="info-wrap">
          <div class="info">
            <span class="name">{{ user?.profile.nickname }}</span>
          </div>
          <el-tooltip
            v-if="profile?.userId === uid"
            placement="top"
            :show-arrow="false"
            popper-class="level-popper"
          >
            <template #content>
              当前等级：Lv.{{ user?.level }}<br />
              距离下一等级还需：<br />
              1. 听歌：{{
                (userLevel.nextPlayCount && userLevel.nowPlayCount)
                ? userLevel.nextPlayCount - userLevel.nowPlayCount
                : 0
              }}
              首<br />
              2. 登录：{{
                (userLevel.nextLoginCount && userLevel.nowLoginCount)
                ? userLevel.nextLoginCount - userLevel.nowLoginCount
                : 0
              }} 天
            </template>
            <span class="level my-level">Lv.{{ user?.level }}</span>
          </el-tooltip>
          <span class="level" v-else>Lv.{{ user?.level }}</span>
          <span class="gender" v-if="user?.profile.gender">
            <i :class="`iconfont icon-${genderArr[user.profile.gender]}`"></i>
          </span>
        </div>
        <div>
          <el-button
            v-if="profile?.userId === uid"
            @click="router.push({ name: 'editProfile' })"
            round
          >
            <i class="iconfont icon-edit"></i>
            &nbsp;编辑资料
          </el-button>
          <el-button
            v-else
            round
          >
            <i class="iconfont icon-message"></i>
            &nbsp;私信
          </el-button>
          <el-button
            v-if="profile?.userId !== uid && user?.profile.followed"
            @click="handleFollowOrUnfollow"
            round
          >
            <i class="iconfont icon-follower"></i>
            &nbsp;已关注
          </el-button>
          <el-button
            v-if="profile?.userId !== uid && !user?.profile.followed"
            @click="handleFollowOrUnfollow"
            round
          >
            <i class="iconfont icon-follow"></i>
            &nbsp;关注
          </el-button>
        </div>
      </div>
      <div class="mid-profile">
        <div class="item left-item" @click="handleClickFollow">
          <span class="num">{{ user?.profile.follows }}</span>
          <span class="label">关注</span>
        </div>
        <div class="item mid-item">
          <div class="mid-wrap" @click="handleClickFans">
            <span class="num">{{ user?.profile.followeds }}</span>
            <span class="label">粉丝</span>
          </div>
        </div>
        <div class="item right-item">
          <span class="num">{{ user?.listenSongs }}</span>
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
        <div class="signature single-line-ellipsis" ref="signatureRef">
          <span class="label">个人介绍：</span>
          <span
            class="content"
            @click="toggleReadMore"
          >{{ user?.profile.signature }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount, computed, ref,
} from 'vue'
import { getUserDetail, getUserLevel, followOrUnfollow } from '@/api/user'
import { useRouter } from 'vue-router'
import { formatTimestamp } from '@/utils/format'
import regionData from '@/assets/ts/region'
import useUserStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { UserDetail } from '@/assets/types/user'

const props = defineProps<{
  uid: number
}>()
const emit = defineEmits(['finish-loading'])

const { userDetail, userLevel } = storeToRefs(useUserStore())
const { profile } = userDetail.value

/* 路由管理 */
const router = useRouter()

/* 渲染数据 */
const user = ref<UserDetail>()
const genderArr = ['unknown', 'male', 'female']

const getData = async () => {
  // 如果是用户本身，则直接取 userDetail 的数据
  if (props.uid === profile?.userId) {
    user.value = userDetail.value as UserDetail
  } else {
    // 如果是其他用户，则发送请求
    const { data: detailData } = await getUserDetail({ uid: props.uid })
    user.value = detailData
  }
  // 获取用户等级信息
  if (profile?.userId === props.uid && userLevel.value.level === undefined) {
    const { data: levelData } = await getUserLevel()
    userLevel.value = levelData.data
  }
  // 数据加载完成
  emit('finish-loading')
}
onBeforeMount(() => {
  getData()
})

/* 格式化日期 */
const createTime = computed(() => {
  if (user.value?.createTime) {
    const obj = formatTimestamp(user.value?.createTime)
    return `${obj.year}-${obj.month}-${obj.date}`
  }
  return ''
})

/* 所在地区 */
const region = computed(() => {
  let province = ''
  let city = ''
  if (user.value?.profile.province) {
    regionData.forEach((p) => {
      if (p.code === String(user.value?.profile.province)) {
        province = p.value
        if (p.children.length) {
          p.children.forEach((c) => {
            if (c.code === String(user.value?.profile.city)) {
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
  router.push({ name: 'follows', params: { id: props.uid } })
}

/* 点击粉丝 */
const handleClickFans = () => {
  router.push({ name: 'fans', params: { id: props.uid } })
}

/* 点击介绍查看更多 */
const signatureRef = ref<HTMLElement | null>(null)
const isDescDetail = ref(false)
const toggleReadMore = () => {
  isDescDetail.value = !isDescDetail.value
  if (isDescDetail.value) {
    signatureRef.value!.style.whiteSpace = 'normal'
  } else {
    signatureRef.value!.style.whiteSpace = 'nowrap'
  }
}

/* 关注或取消关注 */
const handleFollowOrUnfollow = async () => {
  const { data } = await followOrUnfollow({
    id: user.value?.profile.userId!,
    t: user.value?.profile.followed ? 0 : 1,
  })
  if (data.code === 200) {
    ElMessage({
      type: 'success',
      message: user.value?.profile.followed ? '已取消关注！' : '关注成功！',
      appendTo: document.body,
    })
  }
}
</script>

<style scoped lang="scss">
.profile-wrap {
  display: flex;
  color: $font-color;
  .left {
    width: 200px;
    height: 200px;
    margin-right: 20px;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
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
          padding-bottom: 5px;
        }
      }
      .level {
        font-size: 12px;
        background-color: $theme-color-1;
        padding: 1px 5px;
        border-radius: 20px;
        margin-right: 10px;
      }
      .my-level {
        cursor: pointer;
      }
      .gender {
        font-weight: bold;
        font-size: 12px;
        .icon-male, .icon-female {
          color: $theme-color-1;
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
          font-weight: 800;
          color: $label-color;
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
        color: $label-color;
        font-weight: 800;
        font-size: 15px;
      }
      .content {
        font-size: 14px;
      }
      .region {
        margin: 10px 0;
      }
      .signature {
        width: 100%;
        .content {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
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
