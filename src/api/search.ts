import request from '@/utils/request'

export const getSearchKeyword = () => request({
  method: 'GET',
  url: '/search/default',
})

export const getHotSearch = () => request({
  method: 'GET',
  url: '/search/hot/detail',
})

interface getSearchSuggestParams {
  keywords: string
  type?: string
}
export const getSearchSuggest = (params: getSearchSuggestParams) => request({
  method: 'GET',
  url: '/search/suggest',
  params,
})

interface getSearchMatchParams {
  keywords: string
}
export const getSearchMatch = (params: getSearchMatchParams) => request({
  method: 'GET',
  url: '/search/multimatch',
  params,
})

interface getSearchResultParams {
  keywords: string
  limit?: number
}
export const getSearchResult = (params: getSearchResultParams) => request({
  method: 'GET',
  url: '/search',
  params,
})
