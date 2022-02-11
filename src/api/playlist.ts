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

export const otherApi = ''
