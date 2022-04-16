import request from '../utils/request'

export const getUserDetail = (params: {
  uid: number
}) => request({
  method: 'GET',
  url: '/user/detail',
  params,
})

export const getUserAccount = () => request({
  method: 'GET',
  url: '/user/account',
})

// 获取等级信息
export const getUserLevel = () => request({
  method: 'GET',
  url: '/user/level',
})

// 获取用户绑定信息
export const getUserBindings = () => request({
  method: 'GET',
  url: '/user/binding',
})

// 更新用户信息
export const updateUserProfile = (params: {
  nickname: string
  gender: string
  birthday: string
  province: string
  city: string
  signature: string
}) => request({
  method: 'GET',
  url: '/user/update',
  params,
})

// 更新用户头像
export const updateUserAvatar = (
  formData: FormData,
  params: {
    imgSize?: number
    imgX?: number
    imgY?: number
  },
) => request({
  method: 'POST',
  url: '/avatar/upload',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
  params,
})

export const getUserPlaylist = (params: {
  uid: number
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/user/playlist',
  params,
})

export const getUserFollows = (params: {
  uid: number
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/user/follows',
  params,
})

export const getUserFans = (params: {
  uid: number
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/user/followeds',
  params,
})

export const followOrUnfollow = (params: {
  id: number
  t: number // 1 为关注，其他为取消关注
}) => request({
  method: 'GET',
  url: '/follow',
  params,
})
