import request from '@/utils/request'

interface getPlaylistDetailParams {
  id: number // 歌单 id
  s?: number // 歌单最近的 s 个收藏者，默认为 8
}
export const getPlaylistDetail = (params: getPlaylistDetailParams) => request({
  method: 'GET',
  url: '/playlist/detail',
  params,
})

// 获取精品歌单标签列表
export const getTagList = () => request({
  method: 'GET',
  url: '/playlist/highquality/tags',
})

interface updatePlaylistParams {
  id: number
  name: string
  desc: string
  tags: string
}
// 更新歌单信息
export const updatePlaylist = (params: updatePlaylistParams) => request({
  method: 'GET',
  url: '/playlist/update',
  params,
})

interface updatePlaylistCoverParams {
  id: number
  imgSize?: number
  imgX?: number
  imgY?: number
}
// 更新歌单封面
export const updatePlaylistCover = (
  formData: FormData,
  params: updatePlaylistCoverParams,
) => request({
  method: 'POST',
  url: '/playlist/cover/update',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  params,
})
