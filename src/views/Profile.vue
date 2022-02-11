<template>
  <div class="wrap">
    <el-scrollbar height="450px">
      <div class="desc">
        <div class="left">
          <el-avatar :size="200" fit="fit" :src="state.avatarUrl"></el-avatar>
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
      <div class="playlist">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="创建的歌单" name="created">
            <ListItem
              v-for="item in createdPlaylist"
              :key="item.id"
              :info="item"
              @click="router.push({ name: 'playlist', params: { id: item.id } })"
            />
          </el-tab-pane>
          <el-tab-pane label="收藏的歌单" name="starred">
            <ListItem
              v-for="item in starredPlaylist"
              :key="item.id"
              :info="item"
              @click="router.push({ name: 'playlist', params: { id: item.id } })"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { getUserDetail, getUserLevel, getUserPlaylist } from '@/api/user'
import { useRouter } from 'vue-router'
import { Decrypt } from '@/utils/secret'
import ListItem, { infoType } from '@/components/playlist/ListItem.vue'

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
const createdPlaylist = reactive<infoType[]>([])
const starredPlaylist = reactive<infoType[]>([])
onBeforeMount(async () => {
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
  // 获取用户歌单信息
  const { data: playlistData } = await getUserPlaylist({ uid })
  playlistData.playlist.forEach((item: any) => {
    const obj: infoType = {
      id: item.id,
      coverImg: item.coverImgUrl,
      title: item.name,
      songCount: item.trackCount,
      creator: item.creator.nickname,
      starCount: item.subscribedCount,
      playCount: item.playCount,
    }
    if (String(item.creator.userId) === uid) {
      // 如果是用户创建的歌单
      createdPlaylist.push(obj)
    } else {
      // 如果是用户收藏的歌单
      starredPlaylist.push(obj)
    }
  })
})

const activeTab = ref('created')
</script>

<style scoped lang="scss">
.wrap {
  padding: 20px;
  .desc {
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
  .playlist {
    padding-top: 20px;
  }
}
</style>
