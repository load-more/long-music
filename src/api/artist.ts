import request from '@/utils/request'

export const getArtist = (params: {
  id: number
}) => request({
  method: 'GET',
  url: '/artists',
  params,
})

export const getArtistMv = (params: {
  id: number
}) => request({
  method: 'GET',
  url: '/artist/mv',
  params,
})

export const getArtistAlbum = (params: {
  id: number
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/artist/album',
  params,
})

export const getArtistDesc = (params: {
  id: number
}) => request({
  method: 'GET',
  url: '/artist/desc',
  params,
})

export const getArtistDetail = (params: {
  id: number
}) => request({
  method: 'GET',
  url: '/artist/detail',
  params,
})

export const getArtistSimi = (params: {
  id: number
}) => request({
  method: 'GET',
  url: '/simi/artist',
  params,
})
