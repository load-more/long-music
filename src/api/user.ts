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
