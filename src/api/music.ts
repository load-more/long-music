import request from '@/utils/request'

interface getMusicUrlParams {
  id: number
  br?: number
}
export const getMusicUrl = (params: getMusicUrlParams) => request({
  method: 'GET',
  url: '/music/url',
  params,
})

interface getMusicDetailParams {
  ids: number
}
export const getMusicDetail = (params: getMusicDetailParams) => request({
  method: 'GET',
  url: '/song/detail',
  params,
})

export const getMusicLyric = (params: { id: number }) => request({
  method: 'GET',
  url: '/lyric',
  params,
})

export const getMusicComment = (params: {
  id: number
  limit?: number
  offset?: number
  before?: number
}) => request({
  method: 'GET',
  url: '/comment/music',
  params,
})
