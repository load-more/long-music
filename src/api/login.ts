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

interface generateQrKeyParams {
  timestamp: number
}
export const generateQrKey = (params: generateQrKeyParams) => {
  return request({
    method: 'GET',
    url: '/login/qr/key'
  })
}

interface generateQrCodeParams {
  key: string
  qrimg?: boolean
  timestamp: number
}
export const generateQrCode = (params: generateQrCodeParams) => {
  return request({
    method: 'GET',
    url: '/login/qr/create',
    params
  })
}

interface checkQrCodeParams {
  key: string
  timestamp: number
}
export const checkQrCode = (params: checkQrCodeParams) => {
  return request({
    method: 'GET',
    url: '/login/qr/check',
    params
  })
}
