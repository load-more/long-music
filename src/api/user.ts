import request from '../utils/request'

interface getUserDetailParams {
  uid: number
}
export const getUserDetail = (params: getUserDetailParams) => {
  return request({
    method: 'GET',
    url: '/user/detail',
    params
  })
}

// 获取账号信息【暂时没用】
export const getUserAccount = () => {
  return request({
    method: 'GET',
    url: '/user/account'
  })
}

// 获取歌单信息
export const getUserPlaylist = () => {
  return request({
    method: 'GET',
    url: '/user/subcount'
  })
}

// 获取等级信息
export const getUserLevel = () => {
  return request({
    method: 'GET',
    url: '/user/level'
  })
}

// 获取用户绑定信息
export const getUserBindings = () => {
  return request({
    method: 'GET',
    url: '/user/binding'
  })
}

interface updateUserProfileParams {
  nickname: string
  gender: string
  birthday: string
  province: string
  city: string
  signature: string
}
// 更新用户信息
export const updateUserProfile = (params: updateUserProfileParams) => {
  return request({
    method: 'GET',
    url: '/user/update',
    params
  })
}

interface updateUserAvatarParams {
  imgSize?: number
  imgX?: number
  imgY?: number
}
// 更新用户头像
export const updateUserAvatar = (formData: FormData, params: updateUserAvatarParams) => {
  return request({
    method: 'POST',
    url: '/avatar/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    params
  })
}
