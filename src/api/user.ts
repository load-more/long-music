import request from '../utils/request'

interface getUserDetailParams {
  uid: number
}
export const getUserDetail = (params: getUserDetailParams) => request({
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

interface updateUserProfileParams {
  nickname: string
  gender: string
  birthday: string
  province: string
  city: string
  signature: string
}
// 更新用户信息
export const updateUserProfile = (params: updateUserProfileParams) => request({
  method: 'GET',
  url: '/user/update',
  params,
})

interface updateUserAvatarParams {
  imgSize?: number
  imgX?: number
  imgY?: number
}
// 更新用户头像
export const updateUserAvatar = (
  formData: FormData,
  params: updateUserAvatarParams,
) => request({
  method: 'POST',
  url: '/avatar/upload',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: formData,
  params,
})

interface ParamsType {
  uid: number
  limit?: number
  offset?: number
}
export const getUserPlaylist = (params: ParamsType) => request({
  method: 'GET',
  url: '/user/playlist',
  params,
})

export const getUserFollows = (params: ParamsType) => request({
  method: 'GET',
  url: '/user/follows',
  params,
})
