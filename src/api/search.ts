import request from '@/utils/request'

export const getSearchKeyword = () => request({
  method: 'GET',
  url: '/search/default',
})

export const getHotSearch = () => request({
  method: 'GET',
  url: '/search/hot/detail',
})
