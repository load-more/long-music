import request from '../utils/request'

interface phoneLoginParams {
  phone: string,
  password?: string,
  countrycode?: string,
  md5_password?: string,
  captcha?: string
}
export const phoneLogin = (params: phoneLoginParams) => {
  return request({
    method: 'GET',
    url: '/login/cellphone',
    params
  })
}
