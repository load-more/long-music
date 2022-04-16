import request from '../utils/request'

export const phoneLogin = (params: {
  phone: string
  password?: string
  countrycode?: string
  md5_password?: string
  captcha?: string
}) => request({
  method: 'GET',
  url: '/login/cellphone',
  params,
})

export const emailLogin = (params: {
  email: string
  password?: string
  md5_password?: string
}) => request({
  method: 'GET',
  url: '/login',
  params,
})

export const generateQrKey = () => request({
  method: 'GET',
  url: '/login/qr/key',
})

export const generateQrCode = (params: {
  key: string
  qrimg?: boolean
}) => request({
  method: 'GET',
  url: '/login/qr/create',
  params,
})

export const checkQrCode = (params: {
  key: string
}) => request({
  method: 'GET',
  url: '/login/qr/check',
  params,
})

export const sendCaptcha = (params: {
  phone: string
  ctcode?: number
}) => request({
  method: 'GET',
  url: '/captcha/sent',
  params,
})

export const verifyCaptcha = (params: {
  phone: string
  captcha: string
  ctcode?: number
}) => request({
  method: 'GET',
  url: '/captcha/verify',
  params,
})

export const logout = () => request({
  method: 'GET',
  url: '/logout',
})

export const getLoginStatus = () => request({
  method: 'GET',
  url: '/login/status',
})
