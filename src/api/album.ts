import request from '@/utils/request'

export const getAlbumDetail = (params: {
  id: number
}) => request({
  method: 'GET',
  url: '/album',
  params,
})

export const getAlbumComments = (params: {
  id: number
  limit?: number
  offset?: number
  before?: number
}) => request({
  method: 'GET',
  url: '/comment/album',
  params,
})
