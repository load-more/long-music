import request from '@/utils/request'

export const register = (params: {
  phone: string
  password: string
  captcha: string
  nickname: string
  countrycode?: string
}) => request({
  method: 'GET',
  url: '/register/cellphone',
  params,
})

export const changePassword = () => {

}

export const checkIsRegistered = (params: {
  phone: string
  countrycode?: string
}) => request({
  method: 'GET',
  url: '/cellphone/existence/check',
  params,
})
