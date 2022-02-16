import request from '@/utils/request'

export const getHomeBanner = () => request({
  method: 'GET',
  url: '/banner',
})

export const others = null
