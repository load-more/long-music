import request from '@/utils/request'

export const getVideoGroupList = () => request({
  method: 'GET',
  url: '/video/group/list',
})

export const getCategoryList = () => request({
  method: 'GET',
  url: '/video/category/list',
})

export const getVideosByGroupId = (params: {
  id: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/video/group',
  params,
})

export const getAllVideos = (params: {
  offset?: number
}) => request({
  method: 'GET',
  url: '/video/timeline/all',
  params,
})

export const getRecommendVideos = (params: {
  offset?: number
}) => request({
  method: 'GET',
  url: '/video/timeline/recommend',
  params,
})

export const getRelatedVideos = (params: {
  id: number | string
}) => request({
  method: 'GET',
  url: '/related/allvideo',
  params,
})

export const getVideoDetail = (params: {
  id: string
}) => request({
  method: 'GET',
  url: '/video/detail',
  params,
})

export const getVideoData = (params: {
  vid: string
}) => request({
  method: 'GET',
  url: '/video/detail/info',
  params,
})

export const getVideoUrl = (params: {
  id: string
}) => request({
  method: 'GET',
  url: '/video/url',
  params,
})

export const getMvDetail = (params: {
  mvid: number
}) => request({
  method: 'GET',
  url: '/mv/detail',
  params,
})

export const getMvData = (params: {
  mvid: number
}) => request({
  method: 'GET',
  url: '/mv/detail/info',
  params,
})

export const getMvUrl = (params: {
  id: number
  r?: number
}) => request({
  method: 'GET',
  url: '/mv/url',
  params,
})

export const getMvComments = (params: {
  id: number
  limit?: number
  offset?: number
  before?: number
}) => request({
  method: 'GET',
  url: '/comment/mv',
  params,
})

export const getVideoComments = (params: {
  id: number
  limit?: number
  offset?: number
  before?: number
}) => request({
  method: 'GET',
  url: '/comment/video',
  params,
})

export const getAllMvs = (params: {
  area?: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国',
  type?: '全部' | '官方版' | '原生' | '现场版' | '网易出品',
  order?: '上升最快' | '最热' | '最新',
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/mv/all',
  params,
})

export const getNewestMvs = (params: {
  area?: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国',
  limit?: number
}) => request({
  method: 'GET',
  url: '/mv/first',
  params,
})

export const getExclusiveMvs = (params: {
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/mv/exclusive/rcmd',
  params,
})

export const getRecommendMvs = () => request({
  method: 'GET',
  url: '/personalized/mv',
})

export const getTopMvs = (params: {
  area?: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国',
  limit?: number
  offset?: number
}) => request({
  method: 'GET',
  url: '/top/mv',
  params,
})
