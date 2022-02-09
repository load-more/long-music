import request from '@/utils/request'

interface registerParams {
  phone: string
  password: string
  captcha: string
  nickname: string
  countrycode?: string
}
export const register = (params: registerParams) => request({
  method: 'GET',
  url: '/register/cellphone',
  params,
})

export const changePassword = () => {

}

interface checkIsRegisteredParams {
  phone: string
  countrycode?: string
}
export const checkIsRegistered = (params: checkIsRegisteredParams) => request({
  method: 'GET',
  url: '/cellphone/existence/check',
  params,
})
