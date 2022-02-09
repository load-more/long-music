import request from '../utils/request'

interface phoneLoginParams {
  phone: string
  password?: string
  countrycode?: string
  md5_password?: string
  captcha?: string
}
export const phoneLogin = (params: phoneLoginParams) => request({
  method: 'GET',
  url: '/login/cellphone',
  params,
})

interface emailLoginParams {
  email: string
  password?: string
  md5_password?: string
}
export const emailLogin = (params: emailLoginParams) => request({
  method: 'GET',
  url: '/login',
  params,
})

export const generateQrKey = () => request({
  method: 'GET',
  url: '/login/qr/key',
})

interface generateQrCodeParams {
  key: string
  qrimg?: boolean
}
export const generateQrCode = (params: generateQrCodeParams) => request({
  method: 'GET',
  url: '/login/qr/create',
  params,
})

interface checkQrCodeParams {
  key: string
}
export const checkQrCode = (params: checkQrCodeParams) => request({
  method: 'GET',
  url: '/login/qr/check',
  params,
})

interface sendCaptchaParams {
  phone: string
  ctcode?: number
}
export const sendCaptcha = (params: sendCaptchaParams) => request({
  method: 'GET',
  url: '/captcha/sent',
  params,
})

interface verifyCaptchaParams {
  phone: string
  captcha: string
  ctcode?: number
}
export const verifyCaptcha = (params: verifyCaptchaParams) => request({
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
