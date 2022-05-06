import request from '@/utils/request'

export const getMusicUrl = (params: {
  id: number
  br?: number
}) => request({
  method: 'GET',
  url: '/song/url',
  params,
})

export const getMusicDetail = (params: {
  ids: number
}) => request({
  method: 'GET',
  url: '/song/detail',
  params,
})

export const getMusicLyric = (params: {
  id: number
}) => request({
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

export const checkMusic = (params: {
  id: number
  br?: number
}) => request({
  method: 'GET',
  url: '/check/music',
  params,
})

export const likeMusic = (params: {
  id: number
  like?: boolean
}) => request({
  method: 'GET',
  url: '/like',
  params,
})
