import request from '@/utils/request'

export const getSearchKeyword = () => request({
  method: 'GET',
  url: '/search/default',
})

export const getHotSearch = () => request({
  method: 'GET',
  url: '/search/hot/detail',
})

export const getSearchSuggest = (params: {
  keywords: string
  type?: string
}) => request({
  method: 'GET',
  url: '/search/suggest',
  params,
})

export const getSearchMatch = (params: {
  keywords: string
}) => request({
  method: 'GET',
  url: '/search/multimatch',
  params,
})

export const getSearchResult = (params: {
  keywords: string
  limit?: number
  offset?: number
  type?: number
}) => request({
  method: 'GET',
  url: '/cloudsearch',
  params,
})
