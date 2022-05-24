import { Artist } from './artist'

export interface Mv {
  id: number
  name: string
  status: number
  artistName: string
  imgurl16v9: string
  imgurl: string
  artist: Artist
  duration: number
  playCount: number
  publishTime: string
  subed: boolean
}

export interface MvDetail {
  id: number
  name: string
  artistId: number
  artistName: string
  briefDesc: string
  desc: string
  cover: string
  coverId_str: string
  coverId: number
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  duration: number
  nType: number
  publishTime: string
  price: unknown
  brs: {
    size: number
    br: number
    point: number
  }[]
  artists: {
    id: number
    name: string
    img1v1Url: string
    followed: boolean
  }[]
  commentThreadId: string
  videoGroup: {
    id: number
    name: string
    type: number
  }[]
}

export interface MvBrief {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: string
  desc: string
  artistName: string
  artistId: number
  duration: number
  mark: number
  subed: boolean
  artists: {
    id: number
    name: string
  }[]
}

export interface MvData {
  likedCount: number
  shareCount: number
  commentCount: number
  liked: boolean
}

export interface MvUrl {
  id: number
  url: string
  r: number
  size: number
  md5: string
  code: number
  expi: number
  fee: number
  mvFee: number
  st: number
  promotionVo: unknown
  msg: string
}

export interface VideoUrl {
  id: string
  url: string
  size: number
  validityTime: number
  needPay: boolean
  payInfo: unknown
  r: number
}

export interface VideoBrief {
  alg: string
  type: number
  title: string
  durationms: number
  creator: {
    userId: number
    userName: string
  }[]
  playTime: number
  coverUrl: string
  vid: string
  aliaName: string
  transName: string
  markTypes: unknown[]
  liveRoom: unknown
}

export interface VideoDetail {
  vid: string
  creator: {
    authStatus: number
    followed: boolean
    accountStatus: number
    userId: number
    userType: number
    nickname: string
    avatarUrl: string
    expertTags: string[]
    experts: {
      [key: string]: string
    }
    avatarDetail: {
      userType: number
      identityLevel: number
      identityIconUrl: string
    }
  }
  coverUrl: string
  title: string
  description: string
  durationms: number
  threadId: string
  playTime: number
  praisedCount: number
  commentCount: number
  shareCount: number
  subscribeCount: number
  publishTime: number
  avatarUrl: string
  width: number
  height: number
  resolutions: {
    size: number
    resolution: number
  }[]
  videoGroup: {
    id: number
    name: string
    alg: unknown
  }[]
  hasRelatedGameAd: boolean
  advertisement: boolean
  authType: number
  markTypes: unknown[]
  videoUserLiveInfo: unknown
  alg?: string
  scm?: string
  urlInfo?: {
    id: string
    url: string
    size: number
    validityTime: number
    needPay: boolean
    payInfo: unknown
    r: number
  }
  previewUrl?: unknown
  previewDurationms?: number
  relateSong?: unknown[]
  relatedInfo?: unknown
  praised?: boolean
  subscribed?: boolean
}

export interface VideoTag {
  id: number
  name: string
  url: string
  relatedVideoType: unknown
  selectTab: boolean
  abExtInfo: unknown
}
