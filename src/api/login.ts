import request from '../utils/request'

interface phoneLoginParams {
  phone: string
  password?: string
  countrycode?: string
  md5_password?: string
  captcha?: string
}
export const phoneLogin = (params: phoneLoginParams) => {
  return request({
    method: 'GET',
    url: '/login/cellphone',
    params
  })
}

interface emailLoginParams {
  email: string
  password?: string
  md5_password?: string
}
export const emailLogin = (params: emailLoginParams) => {
  return request({
    method: 'GET',
    url: '/login',
    params
  })
}
