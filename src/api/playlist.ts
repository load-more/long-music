import request from '@/utils/request'

export const getPlaylistDetail = (params: {
  id: number // 歌单 id
  s?: number // 歌单最近的 s 个收藏者，默认为 8
}) => request({
  method: 'GET',
  url: '/playlist/detail',
  params,
})

// 获取精品歌单标签列表
export const getTagList = () => request({
  method: 'GET',
  url: '/playlist/highquality/tags',
})

// 更新歌单信息
export const updatePlaylist = (params: {
  id: number
  name: string
  desc: string
  tags: string
}) => request({
  method: 'GET',
  url: '/playlist/update',
  params,
})

// 更新歌单封面
export const updatePlaylistCover = (
  formData: FormData,
  params: {
    id: number
    imgSize?: number
    imgX?: number
    imgY?: number
  },
) => request({
  method: 'POST',
  url: '/playlist/cover/update',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  params,
  data: formData,
})

// 获取歌单所有歌曲
export const getPlaylistAllSongs = (params: {
  id: number
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/playlist/track/all',
  params,
})

export const getRecommendPlaylist = () => request({
  method: 'GET',
  url: '/recommend/resource',
})

export const getPlaylistComment = (params: {
  id: number
  limit?: number
  offset?: number
  before?: number
}) => request({
  method: 'GET',
  url: '/comment/playlist',
  params,
})

export const getPlaylistSubsribers = (params: {
  id: number
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/playlist/subscribers',
  params,
})
